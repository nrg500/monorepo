def apply(product) {
    return {
        stage("Building ${product}") {
            docker.image('klakegg/hugo:latest').inside("--entrypoint=") {
                dir("products/${product}") {
                    sh "hugo"
                    stash name: "${product}", includes: "public/*"
                }
            }
        }
        stage("Uploading as docker image") {
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage(product, 'berwoutv', '.')
        }
    }
}
return this
