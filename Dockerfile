FROM node:18-alpine3.17 as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


FROM nginx:stable-alpine as prod
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]