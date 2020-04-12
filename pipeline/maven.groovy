def apply(product) {
    return {
        stage("Building product") {
            docker.image('maven:3').inside() {
                dir("products/${product}") {
                    sh "mvn -q clean package -DskipTests"
                    stash name:"${product}", includes: "target/*"
                }
            }
        }
        stage("Uploading as docker image") {
            def imageName = "berwoutv/${product}"
            unstash "${product}"
            dir("products/${product}") {
                stage("Building docker image") {
                    def dockerImage = docker.build(imageName)
                }
                stage("Pushing docker image") {
                    docker.withRegistry('', 'dockerhub') {
                        dockerImage.push()
                    }
                }
                stage("Cleanup") {
                    sh "docker rmi ${imageName}"
                }
            }
        }
    }
}
return this
