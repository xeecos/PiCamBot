var childProcess = require('child_process')
  , express = require('express')
  , http = require('http')
  , morgan = require('morgan')
  , ws = require('ws');
var bodyParser = require('body-parser')
var Serial = require('serialport');
var SerialPort = Serial.SerialPort;
var serialPort = null;
var isConnect = false;
// configuration files
var configServer = require('./lib/config/server');

console.log("READY");

var app = express();
app.set('port', configServer.httpPort);
app.use(express.static(configServer.staticFolder));
app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({ limit:'16mb',extended: true }));
app.use(morgan('dev'));


// serve index
require('./lib/routes').serveIndex(app, configServer.staticFolder);

// HTTP server
http.createServer(app).listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});
function sendMove(leftSpeed,rightSpeed){
  if(serialPort&&isConnect){
    var buf = new Buffer([0xff,0x55,0x7,0x0,0x2,0x5,0,0,0,0]);
    buf.writeInt16LE(leftSpeed,6);
    buf.writeInt16LE(rightSpeed,8);
//      console.log(buf);
    serialPort.write(buf,function(err,res){
      console.log(res);
    });
  }
}
function sendTilt(tilt){
  if(serialPort&&isConnect){
    var buf = new Buffer([0xff,0x55,0x6,0x0,0x2,0xb,0x6,0x1,tilt]);
  //    console.log(buf);
    serialPort.write(buf,function(err,res){
      console.log(res);
    });
  }
}
app.post('/tilt', function (req, res) {
  sendTilt(req.body.tilt);
  res.send("ok");
});
app.post('/move', function (req, res) {
  sendMove(req.body.l,req.body.r);
  res.send("ok");
});
app.post('/connect',(req,res) => {
	if(isConnect==false){
		serialPort = new SerialPort(req.body.port, {baudrate: 115200});
		serialPort.on('open', function () {
			console.log('serial opened!');
			isConnect = true;
		  	serialPort.on('data', function (data) {
//				console.log(data);
			});
		});
		serialPort.on('close', function () {
			isConnect = false;
			console.log('close');
		})
		                        
	  childProcess.exec('/home/pi/PiCamBot/bin/do_ffmpeg.sh');
	}
    res.send('ok');
});
app.post('/list',(req,res) => {
  Serial.list(function (err, ports) {
      var result = "";
      ports.forEach(function(port) {
         result+=port.comName+",";
      });
      res.send(result.substr(0,result.length-1));
  });   
});
app.post('/disconnect',(req,res) => {
    if(serialPort&&isConnect){
        serialPort.close();
        
	  childProcess.exec('/home/pi/PiCamBot/bin/stop_ffmpeg.sh');
    }
    serialPort = null;
    res.send('ok');
});

var STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes
var width = 640;
var height = 480;

// WebSocket server
var wsServer = new (ws.Server)({ port: configServer.wsPort });
console.log('WebSocket server listening on port ' + configServer.wsPort);

wsServer.on('connection', function(socket) {
  // Send magic bytes and video size to the newly connected socket
  // struct { char magic[4]; unsigned short width, height;}
  var streamHeader = new Buffer(8);

  streamHeader.write(STREAM_MAGIC_BYTES);
  streamHeader.writeUInt16BE(width, 4);
  streamHeader.writeUInt16BE(height, 6);
  socket.send(streamHeader, { binary: true });

  console.log('New WebSocket Connection (' + wsServer.clients.length + ' total)');

  socket.on('close', function(code, message){
    console.log('Disconnected WebSocket (' + wsServer.clients.length + ' total)');
  });
});

wsServer.broadcast = function(data, opts) {
  for(var i in this.clients) {
    if(this.clients[i].readyState == 1) {
      this.clients[i].send(data, opts);
    }
    else {
      console.log('Error: Client (' + i + ') not connected.');
    }
  }
};
// HTTP server to accept incoming MPEG1 stream
var server = http.createServer(function (req, res) {
  console.log(
    'Stream Connected: ' + req.socket.remoteAddress +
    ':' + req.socket.remotePort + ' size: ' + width + 'x' + height
  );

  req.on('data', function (data) {
    wsServer.broadcast(data, { binary: true });
  });
});
server.listen(configServer.streamPort, function () {
  console.log('Listening for video stream on port ' + configServer.streamPort);

  // Run do_ffmpeg.sh from node                                                   
  childProcess.exec('/home/pi/PiCamBot/bin/do_ffmpeg.sh');
});
server.timeout = 0;
module.exports.app = app;
