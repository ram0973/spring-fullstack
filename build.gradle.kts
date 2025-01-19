import com.github.gradle.node.npm.task.NpmTask

plugins {
	java
    checkstyle
	id("org.springframework.boot") version "3.4.1"
	id("io.spring.dependency-management") version "1.1.7"
    id("com.github.node-gradle.node") version "7.1.0"
}

group = "ra"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(23)
	}
}

node {
    download.set(false)
    nodeProjectDir.set(file("${project.projectDir}/src/main/react"))
}

//val buildWebApp = tasks.register<NpmTask>("buildWebapp") {
//    args.set(listOf("run", "build"))
//    dependsOn(tasks.npmInstall)
//    inputs.dir("src/main/react")
//    inputs.dir("src/main/react/node_modules")
//    inputs.files("src/main/react/package.json", "src/main/react/package-lock.json",
//        "src/main/react/tsconfig.json", "src/main/react/tsconfig.node.json")
//}

val buildReactApp = tasks.register<Exec>("buildReactApp") {
    group = "build"
    description = "Запускает команду 'bun run build' в папке ./src/main/react"

    //dependsOn("checkstyleMain")

    commandLine("bun", "run", "build")
    workingDir = File("src/main/react")

    // Установка переменных окружения
    environment("NODE_ENV", "dev")
    environment("PUBLIC_URL", "/static")

    standardOutput = System.out
    errorOutput = System.err

    doLast {
        println(">'bun run build' executed.")
    }
}

//val cleanWebApp = tasks.register<Delete>("cleanWebApp") {
//    dependsOn(buildReactApp)
//    delete("build/resources/main/static")
//}

val copyWebApp = tasks.register<Copy>("copyWebApp") {
    dependsOn(buildReactApp)
    from("$rootDir/src/main/react/dist/.")
    into("$rootDir/src/main/resources/static")

}

tasks.build {
    dependsOn(copyWebApp)
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
    testAndDevelopmentOnly("org.springframework.boot:spring-boot-docker-compose")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    runtimeOnly("org.postgresql:postgresql")

    annotationProcessor("org.projectlombok:lombok")
    implementation("org.projectlombok:lombok:1.18.30")
    compileOnly("org.projectlombok:lombok")

    implementation("org.mapstruct:mapstruct:1.6.3")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")

    implementation("net.datafaker:datafaker:2.4.2")

    implementation("org.openapitools:jackson-databind-nullable:0.2.6")

    testImplementation("org.instancio:instancio-junit:5.2.1")


    testImplementation("org.springframework.boot:spring-boot-testcontainers")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("org.testcontainers:postgresql")

    testImplementation("io.rest-assured:rest-assured:5.5.0")
    testImplementation("io.rest-assured:spring-mock-mvc:5.5.0")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

