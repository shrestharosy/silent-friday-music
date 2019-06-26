FROM node:10.16.0-jessie
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
CMD [ "yarn", "start" ]
