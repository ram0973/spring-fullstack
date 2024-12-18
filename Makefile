setup:
	./gradlew wrapper --gradle-version 8.11.1

setup-win:
	.\gradlew wrapper --gradle-version 8.11.1

build-win:
	.\gradlew clean build

build:
	./gradlew clean build

test:
	./gradlew test

test-win:
	.\gradlew test


frontend:
	make -C frontend start

.PHONY: build frontend
