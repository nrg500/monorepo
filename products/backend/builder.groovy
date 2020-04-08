def build (product) {
    def mvnBuilder = load("pipeline/maven.groovy")
    return mvnBuilder.createStage(product)
}
return this