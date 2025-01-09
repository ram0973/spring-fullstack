gradle-version = 8.12
ifeq ($(OS),Windows_NT)
	gradle := .\gradlew
else
	gradle := ./gradlew
endif

setup:
	$(gradle) wrapper --gradle-version $(gradle-version)

build:
	APP_PROFILE=test; $(gradle) clean build

test:
	$(gradleTest)

.PHONY: test
