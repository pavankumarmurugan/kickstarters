# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the executable jar file into the container
COPY target/profile-service-0.0.1-SNAPSHOT.jar profile-service-0.0.1-SNAPSHOT.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "profile-service-0.0.1-SNAPSHOT.jar"]

