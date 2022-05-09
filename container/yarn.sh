#!/bin/bash

PWD=$(pwd)

docker run \
  -it \
  --rm \
  -e "NODE_ENV=production" \
  -u "node" \
  -m "300M" --memory-swap "1G" \
  -w //usr/src/app \
  --name "sandbox" \
  -v $PWD:/usr/src/app \
  --entrypoint yarn \
  sandbox \
  $*