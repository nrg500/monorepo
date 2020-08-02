def build() {
    def buildStage = load("pipeline/angular.groovy")
    return buildStage.apply("dinner-planner")
}
return this
