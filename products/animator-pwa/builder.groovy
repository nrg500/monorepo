def build(version) {
  return {
    stage("Uploading as docker image") {
      def dockerBuild = load('pipeline/docker.groovy')
      dockerBuild.buildAndUploadImage('berwoutv', "animator-pwa", version, '.', false)
    }
  }
}
return this
