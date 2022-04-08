def build(version) {
    return {
        stage("Uploading as docker image") {
            dir("products/ingredient-service") {
                stash "ingredient-service"
            }
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage('berwoutv', "ingredient-service", version, '.', true)
        }
    }
}
return this
