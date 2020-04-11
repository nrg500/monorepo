def build() {
    def buildStage = load("pipeline/angular.groovy")
    return buildStage.apply("products/frontend")
}
return this
