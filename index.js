
var Grass = require("./programming3/class.grass")
var GrassEater = require("./programming3/class.grasseater")
var Predator = require("./programming3/class.predator")
var Mulboost = require("./programming3/class.mulboost")
var Virus = require("./programming3/class.virus")

var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static("programming3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000);


let matrix = generate(80, 100, 15, 5, 30, 20)


let grassArr = [];
let grassEatArr = [];
let predatorArr = [];
let mulBoostArr = [];
let virusArr = [];


function generate(matLen, gr, grEat, pred, mB,virus) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }

    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < mB; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < virus; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }


    return matrix
}

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
setInterval(game,1000)


