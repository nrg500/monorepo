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
            dir("products/${product}") {
                def imageName = "berwoutv/${product}"
                unstash "${product}"
                dockerImage = docker.build(imageName)
                docker.withRegistry('', 'dockerhub') {
                    dockerImage.push()
                }
                sh "docker rmi ${imageName}"
            }
        }
    }
}
return this
