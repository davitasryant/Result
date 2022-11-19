
var Grass = require("./programming3/class.grass")
var GrassEater = require("./programming3/class.grasseater")
var Predator = require("./programming3/class.predator")
var Mulboost = require("./programming3/class.mulboost")
var Virus = require("./programming3/class.virus")

var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

app.use(express.static("programming3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000);

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEatArr) {
        grassEatArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in mulBoostArr) {
        mulBoostArr[i].move()
    }
    for (let i in virusArr) {
        virusArr[i].move()
    }
}



