def apply(product) {
    return {
        stage("Building ${product}") {
            docker.image('node:13').inside() {
                dir("products/${product}") {
                    sh "npm install"
                    sh "npm install -g @angular/cli@latest"
                    sh "ng build --prod --outputPath=build/dist"
                    sh "docker build -t ${product} build"
                }
            }
        }
    }
}
return this
