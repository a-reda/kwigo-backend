FROM node:8.15.0-alpine

USER node

# RUN mkdir -p /app
WORKDIR /app

RUN ls

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install

EXPOSE 4000

CMD ["npm", "start"]
