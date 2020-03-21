def buildStage = load("pipeline/maven.groovy")
return buildStage.apply("products/backend")