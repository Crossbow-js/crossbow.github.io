FROM shakyshane/crossbow-build-deps
MAINTAINER Shane Osbourne "shane.osbourne8@gmail.com"

COPY . /usr/share/nginx/html

RUN ./node_modules/.bin/cb release

COPY docker/start.sh /
COPY docker/nginx.conf /etc/nginx/
COPY docker/nginx-secure.conf /etc/nginx/

COPY docker/dhparams.pem /etc/ssl/private/
CMD /start.sh