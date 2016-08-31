# PiCamBot
PiCamBot is a bot for live stream through Wifi. [Video link](https://www.youtube.com/watch?v=vlaxeGBcrjk)

[![video](https://github.com/xeecos/PiCamBot/raw/master/images/2.jpg)](https://www.youtube.com/watch?v=vlaxeGBcrjk)

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
sudo ./bin/install_ffmpeg.sh
```
Or
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
### Setting Serial Port for Raspberry Pi 3

NOTE FOR RASPBERRY PI 3: The Raspberry pi 3 has changed things around a bit: ttyAMA0 now refers to the serial port that is connected to the bluetooth. The old serial port is now called ttyS0. So if you have an RPI3, everywhere you see "ttyAMA0" below, you should read "ttyS0".

The Broadcom UART appears as /dev/ttyAMA0 under Linux. There are several minor things in the way if you want to have dedicated control of the serial port on a Raspberry Pi.

```sudo nano /boot/cmdline.txt```

 * Firstly, the kernel will use the port as controlled by kernel command line contained in /boot/cmdline.txt. The file will look something like this:
 
```
dwc_otg.lpm_enable=0 console=ttyAMA0,115200 kgdboc=ttyAMA0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline rootwait
```
 * The console keyword outputs messages during boot, and the kgdboc keyword enables kernel debugging. You will need to remove all references to ttyAMA0. So, for the example above /boot/cmdline.txt, should contain:

```
dwc_otg.lpm_enable=0 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline rootwait
```

 * Modifying the /boot/config.txt removes this dependency by adding the following line at the end:

```
core_freq=250
```

### Launch Service On Boot

```
sudo cp PiCamBot.service /etc/init.d/picambot.service
sudo chmod +x /etc/init.d/picambot.service
sudo update-rc.d picambot defaults
```

```
sudo service picambot start #start service
sudo service picambot stop #stop service
```

![image](https://github.com/xeecos/PiCamBot/raw/master/images/1.jpg)
