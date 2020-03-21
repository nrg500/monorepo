def build(productName) {
    return {
        stage("Building ${productName}") {
            //  agent { docker { image 'maven:3' } }
            sh "ls -al"
        }
    }
}
return this