FROM node:current-buster as build0

WORKDIR /srv
COPY  . ./
RUN npm install
RUN npm run build


FROM nginx
COPY --from=build0 /srv/build /usr/share/nginx/html/
COPY  ./startup.sh /srv/startup.sh
COPY ./etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "/srv/startup.sh"]

