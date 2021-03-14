def build() {
    return {
        stage("Run selenium container") {
            dir("tests/dinner-planner-tests") {
                def imageName = "berwoutv/dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER}"
               def dockerImage = docker.build(imageName, ".")
                docker.withRegistry('', 'dockerhub') {
                    dockerImage.push()
                }
                sh "docker rmi ${imageName}"
                def test_uri = BRANCH_NAME == "main" ? "https://dinner.berwout.nl" : "https://${BRANCH_NAME}-dinner.berwout.nl"
                sh "kubectl run -i --tty dinner-planner-tests-${BRANCH_NAME}-${BUILD_NUMBER} --image=berwoutv/dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER} --restart=Never --env=TEST_URI=${test_uri}"
            }
        }
    }
}
return this
