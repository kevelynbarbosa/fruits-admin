FROM node:10 as build-deps
WORKDIR /app
COPY package.json base-path.json package-lock.json* ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY default.conf /etc/nginx/conf.d
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
