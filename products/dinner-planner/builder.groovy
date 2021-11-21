def build(version) {
    def buildStage = load("pipeline/angular.groovy")
    return buildStage.apply("dinner-planner", version)
}
return this
