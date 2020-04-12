def apply(product) {
    return {
        stage("Building product") {
            docker.image('maven:3').inside() {
                dir("products/${product}") {
                    sh "mvn -q clean package -DskipTests"
                    stash name:"${product}", includes: "target"
                }
            }
        }
        stage("Building docker image") {
             dir("products/${product}") {
                unstash "${product}"
                sh "docker build -t ${product} ."
            }
        }
    }
}
return this
