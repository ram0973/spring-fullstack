gradle-version = 8.11.1

ifeq ($(OS),Windows_NT)
	gradle := .\gradlew
else
	gradle := ./gradle
endif


setup:
	$(gradle) wrapper --gradle-version $(gradle-version)

build:
	$(gradle) clean build --no-daemon

test:
	$(gradle) test

frontend:
	make -C frontend start

.PHONY: build frontend
