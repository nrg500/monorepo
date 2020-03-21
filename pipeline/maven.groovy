return {
    stage("Building ${PRODUCT_NAME}") {
        docker.image('maven:3').inside() {
            echo 'hello from maven!'
        }
    }
}
