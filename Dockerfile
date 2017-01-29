FROM shakyshane/crossbow-web-deps

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

RUN ./node_modules/.bin/cb release

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
