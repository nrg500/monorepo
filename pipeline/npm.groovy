return {
    stage("Building ${PRODUCT_NAME}") {
        docker.image('node:13').inside() {
            checkout scm
            sh "npm install"
            sh "ng build --prod"
        }
    }
}
