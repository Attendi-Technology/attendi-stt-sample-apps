FROM node:14.16-alpine3.11 as react-build
ARG stt_api_url
ARG stt_api_key
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

RUN REACT_APP_BASE_API_URL=$stt_api_url REACT_APP_API_KEY=$stt_api_key npm run build

FROM nginx:1.16.1
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=react-build /app/build /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]