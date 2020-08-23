def build() {
    return {
        stage("Run selenium container") {
            try {
                try {
                    sh "docker rm -f selenium"
                } catch (Exception e) {}
                try {
                    sh "docker network rm selenium"
                } catch (Exception e) {}
                sh "docker network create selenium"
                sh "docker run -d -p 4444:4444 --network selenium --name selenium -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-alpha-6-20200730"
                docker.image('maven:3').inside("--network selenium") {
                    dir("tests/dinner-planner-tests") {
                        sh "mvn -B -DargLine='-DTEST_URI=https://berwout.nl -DSELENIUM_URI=http://selenium:4444/' clean test"
                    }
                }
            } finally {
                try {
                    sh "docker rm -f selenium"
                } catch (Exception e) {}
                try {
                    sh "docker network rm selenium"
                } catch (Exception e) {}
            }
        }
    }
}
return this
