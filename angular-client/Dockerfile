FROM node:alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install && \
npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/coreui-free-angular-admin-template /usr/share/nginx/html
EXPOSE 80