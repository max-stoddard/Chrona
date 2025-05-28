########## build stage ##########
FROM maven:3.9.7-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn/ .mvn
COPY src ./src
RUN mvn -ntp -B package -DskipTests

########## run stage  ##########
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

