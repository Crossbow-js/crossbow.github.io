FROM nginx:1.10-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public-html /usr/share/nginx/html/public-html
COPY public /usr/share/nginx/html/public
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]