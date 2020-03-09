def build() {
    def maven = load("pipeline/maven.groovy")
    maven.build("backend")
}
return this