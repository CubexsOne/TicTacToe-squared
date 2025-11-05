.PHONY: help

GIT_HASH := $(shell git rev-parse --short HEAD)
GHCR_IMAGE ?= ghcr.io/cubexsone/tictactoe-squared/backend

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dev: ## Starts backend in dev-server
	@npm run dev

docker-build: ## Builds backend Docker image tagged with the current git hash via BuildKit
	@docker buildx build --tag $(GHCR_IMAGE):$(GIT_HASH) --tag $(GHCR_IMAGE):latest .

docker-push: ## Pushes current git hash and latest tags to GitHub Container Registry
	@docker push $(GHCR_IMAGE):$(GIT_HASH)
	@docker push $(GHCR_IMAGE):latest
