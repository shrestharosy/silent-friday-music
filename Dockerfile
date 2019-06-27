FROM node:alpine

RUN apk add --no-cache ffmpeg

EXPOSE 3002

ENTRYPOINT cd app/node-stream-server && yarn && yarn start