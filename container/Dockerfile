FROM nginx
WORKDIR /srv
COPY  . ./
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash &&\
 . /root/.bashrc && \
 nvm install 14.9.0 && \
 npm install && \
 npm run build
RUN cp -a /srv/build/. /usr/share/nginx/html
ENTRYPOINT [ "/srv/startup.sh"]
CMD ["nginx", "-g", "daemon off;"]
