FROM maven:3
ENV test_uri="https://dinner.berwout.nl"
ENV selenium_uri="http://selenium.svc.svc.cluster.local:4444/wd/hub"
COPY pom.xml /
COPY src/test /src/test
RUN mvn clean test-compile
CMD mvn -B -DTEST_URI=$test_uri -DSELENIUM_URI=$selenium_uri test