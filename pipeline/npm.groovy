return {
    stage("Building ${PRODUCT_NAME}") {
        docker.image('node:13').inside() {
            sh "ng build --prod"
        }
    }
}
