def apply(buildDirectory) {
    return {
        stage("Building ${PRODUCT_NAME}") {
            docker.image('node:13').inside() {
                dir(buildDirectory) {
                    sh "npm install"
                    sh "npm install -g @angular/cli@latest"
                    sh "ng build --prod"
                }
            }
        }
    }
}
return this
