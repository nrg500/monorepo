def build() {
    return {
        stage("Run selenium container") {
            sh "docker network create selenium"
            sh "docker run -d --network selenium --name selenium -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-alpha-6-20200730"
             docker.image('maven:3').inside("--network selenium") {
                dir("tests/dinner-planner-tests") {
                    sh "mvn -DargLine='-DTEST_URI=https://berwout.nl' -DargLine='-DSELENIUM_URI=selenium:4444' clean install"
                }
             }
        }
        post {
            always {
                sh "docker network rm selenium"
                sh "docker rm -f selenium"
            }
        }
    }
}
return this
