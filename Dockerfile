FROM mhart/alpine-node:5.10.1

RUN apk add --no-cache bash git

WORKDIR /src
COPY . /src

RUN mkdir -p /root/.ssh
ADD ~/.ssh/id_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start" ]
