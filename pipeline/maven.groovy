return {
    stage("Building ${PRODUCT_NAME}") {
        docker.image('maven:3') {
            sh 'hello from maven!'
        }
    }
}
