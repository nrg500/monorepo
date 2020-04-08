def build() {
    def buildStage = load("pipeline/npm.groovy")
    return buildStage.apply("products/frontend")
}
return this
