def getStageDefinition() {
    def maven = load("pipeline/maven.groovy")
    return maven.build("backend")
}
return this