def build(version) {
    return {
        stage("Uploading as docker image") {
            dir("products/meal-service") {
                stash "meal-service"
            }
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage('berwoutv', "meal-service", version, '.')
        }
    }
}
return this