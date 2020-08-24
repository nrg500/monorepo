def build() {
    return {
        stage("Uploading as docker image") {
            dir("products/meal-service") {
                stash "meal-service"
            }
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage("meal-service", 'berwoutv', '.')
        }
    }
}
return this