def createStage(product) {
    return {
        stage("Building ${product}") {
            docker.image('maven:3').inside() {
                dir("/products/${product}") {
                    sh "mvn -q clean package"
                }
            }
        }
    }
}
return this
