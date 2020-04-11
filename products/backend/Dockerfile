FROM adoptopenjdk:11-jre-hotspot
RUN mkdir /opt/app
COPY target/backend-0.0.1-SNAPSHOT.jar /opt/app/app.jar
CMD ["java", "-jar", "/opt/app/app.jar"]