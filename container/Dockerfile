FROM node:slim

RUN ["adduser", "--home", "/usr/src/app", "--system", "sandbox"]
RUN ["chown", "-R", "sandbox", "/usr/src/app"]
RUN ["chmod", "-R", "u+x", "/usr/src/app"]

COPY sample-npm /usr/src/app/
RUN cd /usr/src/app && yarn install

RUN apt-get update

USER sandbox

EXPOSE 3000
CMD cd /usr/src/app && yarn start