#FROM bellsoft/liberica-openjdk-debian:23.0.1 as builder

FROM bellsoft/liberica-runtime-container:jdk-23-stream-musl AS builder
WORKDIR /
COPY ./gradle gradle
COPY ./build.gradle.kts .
COPY ./settings.gradle.kts .
COPY ./gradlew .
RUN chmod +x ./gradlew
RUN ./gradlew --no-daemon # Запуск ./gradlew без параметров инициирует загрузку дистрибутива, который кэшируется на своем уровне
COPY ./src /src
RUN ./gradlew --no-daemon -i build -x test

FROM bellsoft/liberica-runtime-container:jre-23-stream-musl AS runner
#FROM bellsoft/liberica-openjre-debian:23.0.1 as runner
RUN addgroup --system spring-docker
RUN adduser --system --disabled-password --no-create-home spring-docker spring-docker
USER spring-docker
WORKDIR /
COPY --from=builder /build/libs/web-0.0.1-SNAPSHOT.jar .
ENV JAVA_OPTS="-Xmx512M -Xms512M"
EXPOSE 8080
CMD ["java", "-jar", "web-0.0.1-SNAPSHOT.jar"]
