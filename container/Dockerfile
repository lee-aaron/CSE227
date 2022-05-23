# https://github.com/dodjango/node-sandbox
FROM node:slim

RUN apt-get update

# Create a nonroot user, and switch to it
RUN chown -R node /usr/src && \
  echo "root:Docker!" | chpasswd && \
  mkdir /home/node/.npm-global && \
  chown -R node /home/node

RUN apt-get install -y libseccomp2 libseccomp-dev seccomp python3-seccomp curl

# Switch to our nonroot user
USER node

ENV HOME /home/node
ENV NODE_PATH /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

ENTRYPOINT [ "bash" ]