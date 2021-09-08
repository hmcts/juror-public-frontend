FROM node:8.9.4

LABEL author="Dave Fernandez <dav.fernandez@cgi.com>"

RUN mkdir /app/
WORKDIR /app

# Install deps

COPY ./package* ./
RUN npm install && \
    npm cache clean --force
RUN npm install -g grunt-cli node-gyp
COPY . .
RUN npm config set proxy http://10.100.1.4:3128
RUN npm config set https-proxy http://10.100.1.4:3128
ENV TZ=Europe/London

RUN echo $TZ > /etc/timezone && \
    rm /etc/localtime && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
COPY ./server/config/environment/secret.template.js ./server/config/environment/secret.js
RUN ls -al /app/server/config/environment/
CMD tail -f /dev/null
# ENTRYPOINT ["nodejs", "server/index.js"]

## docker build -f local.dockerfile -t publicportal:latest .
## docker-compose -f docker-compose-local.yml up --build
## docker exec -it juror_portal /bin/bash
## npm install