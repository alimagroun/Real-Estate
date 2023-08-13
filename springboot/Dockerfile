# Use a base image with Java (JRE) and Alpine Linux that supports Java 17
FROM openjdk:17-alpine

# Copy the JAR file into the container
COPY target/real-estate-0.0.1-SNAPSHOT.jar app.jar

# Command to run the Spring Boot application
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
