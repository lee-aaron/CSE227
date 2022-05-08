#/bin/bash

docker build -t sandbox -f ./container/Dockerfile .
docker run -it --rm -v "$(pwd)":"$(pwd)" -p 3000:3000 --cap-add=NET_ADMIN --name sandbox sandbox