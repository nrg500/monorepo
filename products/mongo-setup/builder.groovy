def build(version) {
    return {
        stage("Uploading as docker image") {
            dir("products/mongo-setup") {
                stash "mongo-setup"
            }
            def dockerBuild = load('pipeline/docker.groovy')
            dockerBuild.buildAndUploadImage('berwoutv', "mongo-setup", version, '.')
        }
    }
}
return this