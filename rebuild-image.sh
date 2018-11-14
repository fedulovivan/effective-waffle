#/bin/bash

source variables.sh

docker rmi $IMAGE_NAME

# docker build --tag=$IMAGE_NAME --no-cache . &&\
docker build --tag=$IMAGE_NAME . &&\
    docker save $IMAGE_NAME > $IMAGE_NAME.tar