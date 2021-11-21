def apply(product, version) {
    return {
        stage("Building ${product}") {
            docker.image('node:14').inside() {
                dir("products/${product}") {
                    sh "npm install"
                    sh "npm install -g @angular/cli@latest"
                    sh "ng build --prod --outputPath=build/dist"
                    stash name: "${product}", includes: "build/*"
                }
            }
        }
        stage("Uploading as docker image") {
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage('berwoutv', product, version, 'build')
        }
    }
}
return this
