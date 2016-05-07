# PiCamBot
PiCamBot is a bot for live stream through Wifi. 

![image](https://github.com/xeecos/PiCamBot/raw/master/images/2.jpg)

## Prepare For MegaPi
  MegaPi is an Arduino compatible board based on Mega2560.
 * Download the Arduino library for Makeblock https://github.com/Makeblock-official/Makeblock-Libraries/archive/master.zip
 * Copy the makeblock folder to your arduino default library. Your Arduino library folder should now look like this 
   * (on Windows): ```[x:\Users\XXX\Documents]\Arduino\libraries\makeblock\src```
   * (on Mac OSX): ```[\Users\XXX\Documents]\Arduino\libraries\makeblock\src```
 * Open Arduino IDE, choose the firmware from <em>File&gt;Examples</em>.
 ![image](https://raw.githubusercontent.com/Makeblock-official/PythonForMegaPi/master/images/firmware.jpg)
 * Compile and upload firmware according to your board type.

## Prepare For Raspberry Pi
```
cd ~
git clone https://github.com/xeecos/PiCamBot
```
### Install NodeJs
```
sudo apt-get update
sudo apt-get install gcc-4.8 g++-4.8
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 20
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.6 20
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50
wget http://node-arm.herokuapp.com/node_latest_armhf.deb sudo dpkg -i node_latest_armhf.deb node -v
```
### Compile and Install FFMpeg
```
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
```
The process needs one more hour.

### Install Npm Modules
```
cd ~/PiCamBot
npm install
```
### Running Server
```
node server.js
```
### Controlling Bot On Browser
open the control page on your pc/tablet's browser
```
http://your rpi's ip:8080/
```
![image](https://github.com/xeecos/PiCamBot/raw/master/images/1.jpg)
