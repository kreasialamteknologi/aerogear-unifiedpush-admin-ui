FROM node:14.9.0-alpine3.10 as build0

WORKDIR /srv
COPY  . ./
RUN npm install
RUN npm run build


FROM nginx
EXPOSE 5000
COPY --from=build0 /srv/build /usr/share/nginx/html/
COPY  ./startup.sh /srv/startup.sh
ENTRYPOINT [ "/srv/startup.sh"]
CMD ["nginx", "-g", "daemon off;"]
