def apply(product) {
    return {
        stage("Building ${product}") {
            docker.image('node:13').inside() {
                dir("products/${product}") {
                    sh "npm install"
                    sh "npm install -g @angular/cli@latest"
                    sh "ng build --prod --outputPath=build/dist"
                    stash name: "${product}", includes: "build/*"
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
