def apply(buildDirectory) {
    return {
        stage("Building ${PRODUCT_NAME}") {
            docker.image('node:13').inside() {
                dir(buildDirectory) {
                    sh "npm install"
                    sh "npm install -g @angular/cli@latest"
                    sh "ng build --prod --outputPath=build/dist"
                    sh "docker build -t ${PRODUCT_NAME} build"
                }
            }
        }
    }
}
return this
