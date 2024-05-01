FROM node:20.12.2-bookworm
WORKDIR /app
COPY package*.json ./
RUN npm config set --global strict-ssl false
RUN npm install
COPY . .
