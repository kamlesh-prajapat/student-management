# STEP 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy everything from student-app
COPY . .

# Build the jar
RUN mvn clean package -DskipTests

# STEP 2: Run the application
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]