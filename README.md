# PiCamBot
PiCamBot is a bot for live stream through Wifi. 

![image](https://github.com/xeecos/PiCamBot/raw/master/images/1.jpg)

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
### Install FFMpeg
```
cd PiCamBot/bin
./install_ffmpeg.sh
```
### Install Npm Modules

### Running Server

### Controlling Bot On Browser

