def build() {
    return {
        stage("Uploading as docker image") {
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage("meal-service", 'berwoutv', '.')
        }
    }
}
return this