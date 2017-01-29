FROM shakyshane/nginx-yarn

WORKDIR /usr/share/nginx/html

COPY package.json yarn.lock /usr/share/nginx/html/

RUN yarn

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

RUN ./node_modules/.bin/cb release

EXPOSE 80
EXPOSE 443
