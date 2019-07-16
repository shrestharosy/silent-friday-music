#FROM node:10.16.0-jessie
FROM node:alpine
RUN apk add --no-cache ffmpeg

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
#COPY all the codebase
COPY . ./
USER node

COPY --chown=node:node . .
#RUN cd node-stream-server && yarn install 
EXPOSE 8080

WORKDIR node-stream-server
RUN yarn install 
CMD [ "yarn", "run:production" ]
