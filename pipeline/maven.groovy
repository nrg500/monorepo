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
            dockerBuild = load('docker.groovy')
            dockerBuild.buildAndUploadImage(product, 'berwoutv')
        }
    }
}
return this
