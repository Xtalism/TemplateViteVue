ARG NODE_VERSION=20.12.2
ARG ALPINE_VERSION=3.19
ARG NGINX_VERSION=1.26.0
ARG DEBIAN_VERSION=bookworm

FROM node:${NODE_VERSION}-${DEBIAN_VERSION} AS development
WORKDIR /app
COPY package*.json ./
RUN npm config set --global strict-ssl false
RUN npm install
COPY . .

FROM node:${NODE_VERSION}-${DEBIAN_VERSION} AS build
ENV DOCKER_BUILD="true"
WORKDIR /app
COPY --from=development /app .
RUN npm run build

FROM nginx:${NGINX_VERSION}-alpine${ALPINE_VERSION} AS deploy
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
