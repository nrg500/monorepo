def build() {
    return {
        stage("Run selenium container") {
            dir("tests/dinner-planner-tests") {
                def imageName = "berwoutv/dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER}"
                def jobName = "dinner-planner-tests-${BRANCH_NAME}-${BUILD_NUMBER}"
                def dockerImage = docker.build(imageName, ".")
                docker.withRegistry('', 'dockerhub') {
                    dockerImage.push()
                }
                sh "docker rmi ${imageName}"
                def test_uri = BRANCH_NAME == "main" ? "https://dinner.berwout.nl" : "https://${BRANCH_NAME}-dinner.berwout.nl"
                def jobYaml = readYaml file: "job.yaml"
                jobYaml.spec.template.spec.containers[0].env = [["name": "test_uri", "value": test_uri]]
                jobYaml.spec.template.spec.containers[0].image = imageName
                jobYaml.metadata.name = jobName
                jobYaml.spec.template.spec.containers[0].name = jobName
                writeYaml file: "job.yaml", data: jobYaml, overwrite: true
                sh "kubectl apply -f job.yaml"
                sh "kubectl wait --for=condition=complete --timeout=30s job/${jobName}"
                sh """#!/bin/bash -e
                pods=$(kubectl get pods --selector=job-name=${jobName} --output=jsonpath='{.items[*].metadata.name}' -nsvc)
                kubectl logs $pods
                """
            }
        }
    }
}
return this
