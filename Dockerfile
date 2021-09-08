FROM node:8.9.4

LABEL author="Dave Fernandez <dav.fernandez@cgi.com>"

RUN mkdir /app/

WORKDIR /app

COPY dist/ /app/
RUN npm config set proxy http://10.100.1.4:3128
RUN npm config set https-proxy http://10.100.1.4:3128
ENV TZ=Europe/London

RUN echo $TZ > /etc/timezone && \
    rm /etc/localtime && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    npm install --production


ENTRYPOINT ["nodejs", "server/index.js"]
