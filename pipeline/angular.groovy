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
        stage("Building Docker image") {
            dir("products/${product}") {
                unstash "${product}"
                sh "docker build -t ${product} build"
            }
        }
    }
}
return this
