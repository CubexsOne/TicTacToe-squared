.PHONY: help docker-build

GIT_HASH := $(shell git rev-parse --short HEAD)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: ## Starts frontend in dev-server
	@VITE_SOCKET_URL=http://localhost:3000 \
	npm run dev

docker-build: ## Builds frontend Docker image tagged with the current git hash via BuildKit
	docker buildx build --tag frontend:$(GIT_HASH) .
