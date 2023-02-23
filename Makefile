#!/bin/sh

run:
	docker compose -f docker-compose.yaml up --build

stop:
	docker compose -f docker-compose.yaml down

delete:
	docker rm -f rest-service-nestjs
	docker rmi abe511/rest-service

app:
	docker build --no-cache -t abe511/rest-service:latest .

rm:
	docker rm -f rest-service-postgres rest-service-nestjs rest-service-pgadmin4

rmi:
	docker rmi postgres:15-alpine abe511/rest-service node:18-alpine dpage/pgadmin4:latest

clean:
	docker compose -f docker-compose.yaml down
	docker rm -f rest-service-postgres rest-service-nestjs rest-service-pgadmin4
	docker rmi postgres:15-alpine abe511/rest-service node:18-alpine dpage/pgadmin4:latest