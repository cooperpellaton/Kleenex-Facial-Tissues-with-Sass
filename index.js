var five = require("johnny-five");
var Edison = require("galileo-io");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname));

server.listen(80);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});


var board = new five.Board({
    io: new Edison()
});

board.on("ready", function() {
    var sensor = new five.Sensor({
        pin: "A1",
        freq:250,
        threshold: 1
    });

    var mic = new five.Sensor({
        pin: "A0",
        freq:100
        // threshold: 50
    });
    mic.within([300, 1500], function(){
        console.log(this.value);
        console.log("sound worked");
        io.emit('news');
    })


    // light.on("change", function() {
    //     console.log("Ambient Light Level: ", this.level);
    //     io.emit('news');
    // });
    
});

    // sensor.within([500, 1500], function() {
    //     console.log(this.value);
    // })