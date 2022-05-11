#/bin/bash

wget https://github.com/seccomp/libseccomp/releases/download/v2.5.4/libseccomp-2.5.4.tar.gz
tar -xvf libseccomp-2.5.4.tar.gz
cd libseccomp-2.5.4
./configure
make
make install
cd ..
rm -rf libseccomp-2.5.4
rm libseccomp-2.5.4.tar.gz