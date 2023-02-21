#!/bin/sh

run:
	docker compose -f docker-compose.yaml up

stop:
	docker compose -f docker-compose.yaml down

app:
	docker rm -f rest-service-nestjs
	docker rmi rest-service2_app
	docker compose -f docker-compose.yaml up

rm:
	docker rm -f rest-service-postgres rest-service-nestjs rest-service-pgadmin4

rmi:
	docker rmi postgres:15-alpine rest-service2_app:latest node:18-alpine dpage/pgadmin4:latest

clean:
	docker compose -f docker-compose.yaml down
	docker rm -f rest-service-postgres rest-service-nestjs rest-service-pgadmin4
	docker rmi postgres:15-alpine rest-service2_app node:18-alpine dpage/pgadmin4:latest
	sudo rm -rf pgdata