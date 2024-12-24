gradle-version = 8.11.1
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
	APP_PROFILE=test; $(gradle) test

frontend:
	make -C frontend start

.PHONY: build frontend
