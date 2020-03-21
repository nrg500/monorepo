return {
    stage("Building ${PRODUCT_NAME}") {
        docker.image('maven:3').inside() {
            checkout scm
            sh "mvn clean package"
        }
    }
}
