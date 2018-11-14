#/bin/bash

source variables.sh

docker create --name=$CONTAINER_NAME --publish 127.0.0.1:${BACKEND_PORT}:${BACKEND_PORT} $IMAGE_NAME