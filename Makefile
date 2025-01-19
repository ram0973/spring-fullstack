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
	$(gradle) test
	$env:APP_PROFILE="test"; ./gradlew build

checkstyle:
	$(gradle) checkstyleMain
	$(gradle) checkstyleTest

.PHONY: test
