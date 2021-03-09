def build() {
    return {
        stage("Run selenium container") {
            try {
                try{ 
                    sh '''#!/bin/bash +e
                    docker rm -f selenium
                    docker network rm selenium
                    docker network create selenium
                    docker run -d -p 4444:4444 --network selenium --name selenium -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-alpha-6-20200730
                    '''
                } catch (Exception e) {}
                docker.image('maven:3').inside("--network selenium") {
                    dir("tests/dinner-planner-tests") {
                        if(BRANCH_NAME != "main") {
                            sh "mvn -B -DargLine='-DTEST_URI=https://${BRANCH_NAME}-dinner.berwout.nl -DSELENIUM_URI=http://selenium:4444/' clean test"
                        } else {
                            sh "mvn -B -DargLine='-DTEST_URI=https://dinner.berwout.nl -DSELENIUM_URI=http://selenium:4444/' clean test"
                        }
                       
                    }
                }
            } finally {
                try{ 
                    sh '''#!/bin/bash +e
                    docker rm -f selenium
                    docker network rm selenium
                    '''
                } catch(Exception e) {}
            }
        }
    }
}
return this
