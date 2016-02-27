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
        threshold: 100
    });
    sensor.on("change", function() {
        console.log(this.value);
        io.emit('news');
        });
});

    // sensor.within([500, 1500], function() {
    //     console.log(this.value);
    // })