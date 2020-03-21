return {
    stage("Building ${PRODUCT_NAME}") {
        //  agent { docker { image 'maven:3' } }
        print "Hello from maven!"
    }
}
