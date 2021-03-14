def build() {
    return {
        dir("tests/dinner-planner-tests") {
            stage("Create test container") {

                def imageName = "berwoutv/dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER}"
                def jobName = "dinner-planner-tests-${BRANCH_NAME}-${BUILD_NUMBER}"
                def dockerImage = docker.build(imageName, ".")
                docker.withRegistry('', 'dockerhub') {
                    dockerImage.push()
                }
                sh "docker rmi ${imageName}"
            }
            stage ("Create test job on cluster") {
                def test_uri = BRANCH_NAME == "main" ? "https://dinner.berwout.nl" : "https://${BRANCH_NAME}-dinner.berwout.nl"
                def jobYaml = readYaml file: "job.yaml"
                jobYaml.spec.template.spec.containers[0].env = [["name": "test_uri", "value": test_uri]]
                jobYaml.spec.template.spec.containers[0].image = imageName
                jobYaml.metadata.name = jobName
                jobYaml.spec.template.spec.containers[0].name = jobName
                writeYaml file: "job.yaml", data: jobYaml, overwrite: true
                sh "kubectl apply -f job.yaml"
                try {
                    sh "kubectl wait --for=condition=complete --timeout=30s job/${jobName} -ndefault"
                } catch (Exception e) {
                    
                } finally {
                    def pods = sh(returnStdout: true, script: "kubectl get pods --selector=job-name=${jobName} --output=jsonpath='{.items[*].metadata.name}' -ndefault")
                    sh "kubectl logs $pods -ndefault"
                    sh "kubectl delete job ${jobName} -ndefault"
                    sh "kubectl delete pods $pods -ndefault" 
                }
            }
        }
    }
}
return this
