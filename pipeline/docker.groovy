def buildAndUploadImage(registry, product, version, buildFolder) {
    dir("products/${product}") {
        def imageName = "${registry}/${product}:${version}"
        unstash "${product}"
        def dockerImage = docker.build(imageName, buildFolder)
        docker.withRegistry('', 'dockerhub') {
            dockerImage.push()
        }
        sh "docker rmi ${imageName}"
    }
}
return this