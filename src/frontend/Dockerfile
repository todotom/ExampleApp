FROM node:15.13.0-alpine3.13 as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app
RUN npm run build

FROM nginx:1.19.9-alpine

ARG APP_ENV=${APP_ENV}
#ENV APP_ENV ${APP_ENV}

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY ./nginx/nginx.${APP_ENV}.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]