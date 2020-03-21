def buildStage = load("pipeline/npm.groovy")
return buildStage.apply("products/frontend")