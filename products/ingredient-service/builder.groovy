def build() {
    return {
        stage("Uploading as docker image") {
            dir("products/ingredient-service") {
                stash "ingredient-service"
            }
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage("ingredient-service", 'berwoutv', '.')
        }
    }
}
return this