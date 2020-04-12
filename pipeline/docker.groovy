def buildAndUploadImage(product, registry) {
    dir("products/${product}") {
        def imageName = "${registry}/${product}"
        unstash "${product}"
        dockerImage = docker.build(imageName)
        docker.withRegistry('', 'dockerhub') {
            dockerImage.push()
        }
        sh "docker rmi ${imageName}"
    }
}
return this