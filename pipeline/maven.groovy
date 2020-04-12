def apply(buildDirectory) {
    return {
        stage("Building ${PRODUCT_NAME}") {
            docker.image('maven:3').inside() {
                dir(buildDirectory) {
                    sh "mvn -q clean package"
                    stash name:"${PRODUCT_NAME}", includes: "target"
                    
                }
            }
        }
        stage("Building docker image") {
            dir(buildDirectory) {
                unstash "${PRODUCT_NAME}"
                sh "docker build -t ${PRODUCT_NAME} ."
            }
        }
    }
}
return this
