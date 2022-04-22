FROM node:slim

RUN ["adduser", "--home", "/usr/src/app", "--system", "sandbox"]
RUN ["chown", "-R", "sandbox", "/usr/src/app"]
RUN ["chmod", "-R", "u+x", "/usr/src/app"]

RUN apt-get update