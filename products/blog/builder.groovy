def build (version) {
    def buildStage = load("pipeline/hugo.groovy")
    return buildStage.apply("blog", version)
}
return this