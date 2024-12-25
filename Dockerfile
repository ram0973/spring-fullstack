FROM bellsoft/liberica-runtime-container:jdk-23-stream-musl AS builder
#FROM bellsoft/liberica-openjdk-debian:23 AS builder
WORKDIR /
COPY ./gradle gradle
COPY ./build.gradle.kts .
COPY ./settings.gradle.kts .
COPY ./gradlew .
RUN chmod +x ./gradlew
# Запуск ./gradlew инициирует загрузку дистрибутива,
# который кэшируется на своем уровне
RUN ./gradlew --no-daemon  \
COPY ./src /src
# Тесты не здесь, а в CI/CD пайплайне
RUN ./gradlew --no-daemon -i build -x test

FROM bellsoft/liberica-runtime-container:jre-23-stream-musl AS runner
#FROM bellsoft/liberica-openjre-debian:23 AS runner
RUN addgroup --system spring-fullstack
RUN adduser --system --disabled-password --no-create-home spring-fullstack spring-fullstack
USER spring-fullstack
WORKDIR /
COPY --from=builder /build/libs/web-0.0.1-SNAPSHOT.jar .
ENV JAVA_OPTS="-Xmx512M -Xms512M"
EXPOSE 8080
CMD ["java", "-jar", "web-0.0.1-SNAPSHOT.jar"]
