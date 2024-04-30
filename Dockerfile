# FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm
# Use the official image as a parent image
FROM node:20.12.2-alpine3.19 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20.12.2-alpine3.19
WORKDIR /app
COPY --from=builder ./app/node_modules ./node_modules
COPY . .

EXPOSE 5173
CMD [ "npm", "run", "dev"]
