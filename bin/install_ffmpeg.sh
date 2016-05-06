#!/bin/sh
cd ~
git clone https://git.videolan.org/git/x264.git
cd x264
./configure --host=arm-unknown-linux-gnueabi --enable-static --disable-opencl
make
sudo make install
cd ~
git clone https://github.com/ffmpeg/ffmpeg
cd ffmpeg
sudo ./configure --arch=armel --target-os=linux --enable-gpl --enable-libx264 --enable-nonfree
make
sudo make install
