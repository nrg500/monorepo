def buildAndUploadImage(product, registry, buildFolder) {
    dir("products/${product}") {
        def imageName = "${registry}/${product}"
        unstash "${product}"
        def dockerImage = docker.build(imageName, buildFolder)
        docker.withRegistry('', 'dockerhub') {
            dockerImage.push()
        }
        sh "docker rmi ${imageName}"
    }
}
return this