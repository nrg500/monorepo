FROM node:16-alpine3.14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
EXPOSE 80
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/animator-pwa /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
