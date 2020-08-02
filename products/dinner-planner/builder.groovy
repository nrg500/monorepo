def build() {
    def buildStage = load("pipeline/angular.groovy")
    return buildStage.apply("frontend")
}
return this
