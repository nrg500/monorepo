def build () {
    def buildStage = load("pipeline/hugo.groovy")
    return buildStage.apply("blog")
}
return this