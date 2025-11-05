.PHONY: help

GIT_HASH := $(shell git rev-parse --short HEAD)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: ## Starts backend in dev-server
	@npm run dev

docker-build: ## Builds backend Docker image tagged with the current git hash via BuildKit
	docker buildx build --tag backend:$(GIT_HASH) .