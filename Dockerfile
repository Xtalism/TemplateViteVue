ARG NODE_VERSION=20.12.2
ARG ALPINE_VERSION=3.19
ARG NGINX_VERSION=1.26.0

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set --global strict-ssl false
RUN npm install
COPY . .
RUN npm run build

FROM nginx:${NGINX_VERSION}-alpine${ALPINE_VERSION} AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
