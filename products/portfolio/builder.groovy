def build (version) {
    def buildStage = load("pipeline/hugo.groovy")
    return buildStage.apply("portfolio", version)
}
return this