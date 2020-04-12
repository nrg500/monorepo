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
        stage("Building docker image") {
             dir("products/${product}") {
                def imageName = "berwoutv/${product}"
                unstash "${product}"
                sh "docker build -t berwoutv/${product} ."
                def dockerImage = docker.build(imageName)
                docker.withRegistry('', 'dockerhub') {
                    dockerImage.push()
                }
            }
        }
    }
}
return this
