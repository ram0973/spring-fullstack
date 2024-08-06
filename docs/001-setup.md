# FullStack веб - приложение на Spring и React/Angular?/NextJS?

Процесс разработки веб приложения вкратце.
Пишем под Виндой, под линукс аналогично.

Используемые технологии:

- Java 21+ - Graal VM JDK (not supports Shenandoah GC) or others
(not OpenJDK, it's slowest. BellSoft JDK Full have JavaFX support from the box)
- Spring Boot 3.3+
- Docker
- Liquibase
- Hibernate ORM
- Postgresql
- Gradle Kotlin
- OpenApi
- React
- TypeScript
- Mantine
- PostCSS (with Mantine)

## Ставим нужный софт

- Intellij Idea Pro/Community
- Docker desktop
- Graal VM JDK
- Git
- Punto switcher :)

## Graal VM JDK
Заходим на start.spring.io.
Качаем заготовку проекта:
[здесь](https://start.spring.io/#!type=gradle-project-kotlin&language=java&platformVersion=3.3.2&packaging=jar&jvmVersion=21&groupId=dev&artifactId=web&name=web&description=Web%20project%20with%20Spring%20Boot&packageName=dev.web&dependencies=native,devtools,lombok,configuration-processor,docker-compose,web,thymeleaf,security,oauth2-client,oauth2-resource-server,data-jpa,liquibase,postgresql,validation,mail,actuator,testcontainers,spring-shell)

Качаем Graal VM [отсюда](https://github.com/graalvm/graalvm-ce-builds/releases)

И делаем [настройки](https://www.graalvm.org/latest/docs/getting-started/windows/) :

Распаковываем в C:\lib\graavm21-0-2

Добавляем путь к исполняемым файлам:

setx /M PATH "C:\lib\graavm21-0-2\bin\;%PATH%"

Добавляем JAVA_HOME:

setx /M JAVA_HOME "C:\lib\graavm21-0-2\"

Скачиваем установщик Visual Studio. Настраиваем по инструкции выше.

Проверяем, Открываем консоль:
```bash
java --version
native-image.cmd --version
```

## Kotlin Gradle

В файле gradle/wrapper/gradle-wrapper.properties меняем версию на нужную:

[Версии смотрим тут](https://gradle.org/releases/)

distributionUrl=https\://services.gradle.org/distributions/gradle-8.8-bin.zip

Например вместо 8.8 ставим 8.9

## Idea

Указываем GraalVM в настройках File - Project structure.
Лучше удалить все остальные JDK.
Указываем Help - Edit Custom VM Options:
-Xms2048m
-Xmx2048m
-XX:+UseShenandoahGC

В настройках Idea в поиске пишем encod.
В File Encodings и Console ставим UTF-8.

Также Auto Imports - unambiguous imports on the fly.

Ставим плагины по вкусу:
- Обязательно - EnvFile, в настройках запуска проекта включаем .env файла
- [Amplicode](https://amplicode.ru/download/) (пока бесплатный)
- либо JPA Buddy (но не вместе с Amplicode)
- Rainbow Brackets


## Вспомогательные файлы

Создаем .editorconfig, api.http, compose.yml, gradle.properties.
Копируем файл .env из .env.example.

## Дополнительные Библиотеки

(Берём [отсюда](https://mvnrepository.com/) под нужный сборщик. У нас Kotlin Gradle)
- OpenApi
- MapStruct

Веб-страница OpenApi (Swagger) открывается так: /swagger-ui/index.html

## Настраиваем Git

```bash
git config --global user.name "Your name"
git config --global user.email your_email
git config --global init.defaultBranch main
```

## Прочее
Папки .gradle и build можно безболезненно удалять в случае глюков.

Если тупит Идея, делаем File - Repair Ide либо File - Invalidate Caches
