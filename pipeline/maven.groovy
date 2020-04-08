def apply(buildDirectory) {
    return {
        stage("Building ${PRODUCT_NAME}") {
            docker.image('maven:3').inside() {
                dir(buildDirectory) {
                    sh "mvn -q clean package"
                }
            }
        }
    }
}
return this
