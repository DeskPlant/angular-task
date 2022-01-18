### STAGE 1: Build ###
FROM node:14.18.3-alpine3.15 as builder
##RUN apk --no-cache --update --virtual build-dependencies add python make g++
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
###COPY . .
COPY ./ /usr/src/app
ARG CONFIGURATION
RUN npm run build
###RUN npm run build -- --configuration ${CONFIGURATION}
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist/app /usr/share/nginx/html
