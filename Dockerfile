FROM node:8-alpine

ENV APP_DIR=/effective-waffle

WORKDIR $APP_DIR

RUN apk update &&\
    apk upgrade &&\
    apk add git &&\
    cd ${APP_DIR} &&\
    git clone https://github.com/fedulovivan/effective-waffle.git . &&\
    mkdir -p logs &&\
    yarn &&\
    yarn build

COPY oauth oauth

EXPOSE 1337

CMD ["yarn", "back:docker"]