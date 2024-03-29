FROM node:18-alpine
RUN apk add --no-cache redis
WORKDIR /app-node
COPY . /app-node/
RUN npm install
ENTRYPOINT ["sh", "-c", "redis-server & npm run dev"]