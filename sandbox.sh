#/bin/bash

# get current directory as relative directory to mount to docker
DIR=$(pwd)

if [ ! -x "$(command -v docker)" ]; then
  echo "ERROR: docker is not installed"
  echo "Please install docker to use this script"
  exit 0
fi

# help
if [ $# -eq 0 ] || [ $1 = "-h" ] || [ $1 = "-help" ]; then
  echo "Usage: ./sandbox.sh [options]"
  echo "Options:"
  echo " -h, --help Show this help message"
  echo " init Start the sandbox"
  echo " stop Stop the sandbox"
  exit 0
fi

# handle init
if [ $1 = "init" ]; then
  echo "Initializing Sandbox on Directory: $DIR"
  exit 0
fi

# handle stop
if [ $1 = "stop" ]; then
  echo "Stopping Sandbox"
  exit 0
fi

echo "Unknown Argument"
echo "Please run ./sandbox.sh -h for usage"
exit 1