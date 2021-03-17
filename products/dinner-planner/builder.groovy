def build() {
    dir("products/dinner-planner") {
        stash "dinner-planner"
    }
    def buildStage = load("pipeline/angular.groovy")
    return buildStage.apply("dinner-planner")
}
return this
