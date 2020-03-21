def apply(buildDirectory) {
    return {
        stage("Building ${PRODUCT_NAME}") {
            docker.image('node:13').inside() {
                dir(buildDirectory) {
                    checkout scm
                    sh "npm install"
                    sh "ng build --prod"
                }
            }
        }
    }
}
return this
