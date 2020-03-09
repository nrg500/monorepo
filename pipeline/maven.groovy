def build(productName) {
    stage("Building ${productName}") {
        //  agent { docker { image 'maven:3' } }
         steps {
             sh "ls -al"
         }
    }
}
return this