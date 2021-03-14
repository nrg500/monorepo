def build() {
    return {
        stage("Run selenium container") {
            dir("tests/dinner-planner-tests") {
                sh "docker build -t dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER}"
                def test_uri = BRANCH_NAME == "main" ? "https://dinner.berwout.nl" : "https://${BRANCH_NAME}-dinner.berwout.nl"
                sh "kubectl run -tty dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER} --image=dinner-planner-tests:${BRANCH_NAME}-${BUILD_NUMBER} --restart=Never --env=TEST_URI=${test_uri}"
            }
        }
    }
}
return this
