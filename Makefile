.PHONY: help docker-build

GIT_HASH := $(shell git rev-parse --short HEAD)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-all: ## Builds all services
	@cd frontend && make docker-build;
	@cd backend && make docker-build;

push-all: ## Pushs all services
	@cd frontend && make docker-push;
	@cd backend && make docker-push;

start: ## Starts services local
	@docker compose up && docker compose down;
