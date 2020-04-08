def build(product) {
    def npmBuilder = load("pipeline/npm.groovy")
    return npmBuilder.createStage(product)
}
return this
