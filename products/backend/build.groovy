def getStageDefinition() {
    return { stage ("printing hello butler") {
        print("Hello Butler!")
        }
    }
}
return this