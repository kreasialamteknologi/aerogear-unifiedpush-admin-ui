FROM node:14.9.0-alpine3.10 as build0

WORKDIR /srv
COPY  . ./
RUN npm install
RUN npm run build
COPY  ./startup.sh ./build/

FROM node:14.9.0-alpine3.10

EXPOSE 5000
RUN npm install -g serve
WORKDIR /srv
COPY --from=build0 /srv/build /srv/
#ENTRYPOINT [ "/srv/startup.sh" ]