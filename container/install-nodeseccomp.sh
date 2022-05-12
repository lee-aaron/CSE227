#/bin/bash

DIR=$(pwd)

mkdir node_modules
cd node_modules
git clone https://github.com/roryrjb/node-seccomp.git
cd node-seccomp
npm i
cd $DIR