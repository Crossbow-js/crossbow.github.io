# Named build stage 'build-deps' for use later
FROM node:7.10 as build-deps

WORKDIR /usr/src/app

# Install project dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# Now copy app code and run the build command.
# This will create a 'dist' directory we want later
COPY . /usr/src/app/
RUN npm run build

# Start a new build stage for production, this will not include ANYTHING
# from the previous step, it's like a blank slate.
FROM nginx:1.12-alpine

# Copy the 'dist' folder created in the previous stage
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html

# Copy Nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




