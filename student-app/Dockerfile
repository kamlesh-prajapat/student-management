# Use Java 21
FROM eclipse-temurin:21-jdk-jammy

# Set working directory
WORKDIR /student-app

# Copy jar file
COPY target/student-app.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]