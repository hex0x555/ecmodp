#!/bin/bash

echo "Stopping and removing containers..."
docker-compose down

echo "Building Docker images..."
docker-compose build

echo "Starting up containers..."
docker-compose up
