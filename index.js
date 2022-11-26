
Grass = require("./programming3/class.grass")
GrassEater = require("./programming3/class.grasseater")
Predator = require("./programming3/class.predator")
Mulboost = require("./programming3/class.mulboost")
Virus = require("./programming3/class.virus")

var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("programming3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000);

stat = {
    grass: 0,
    grasseater: 0,
    predator: 0,
    mulboost: 0,
    virus: 0,
}
grassArr = [];
grassEatArr = [];
predatorArr = [];
mulBoostArr = [];
virusArr = [];
// weather = ["garun", "ashun", "amar", "dzmer"]
matrix = generate(60, 100, 15, 5, 30, 20)



function generate(matLen, gr, grEat, pred, mB, virus) {
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


// tany function weather anem vory xrgem io.emit io.on stanum 








for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] == 1) {
            let gr = new Grass(x, y);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            let grEat = new GrassEater(x, y)
            grassEatArr.push(grEat)
        }

        else if (matrix[y][x] == 3) {
            let pred = new Predator(x, y)
            predatorArr.push(pred)
        }
        else if (matrix[y][x] == 4) {
            let mB = new Mulboost(x, y)
            mulBoostArr.push(mB)
        }
        else if (matrix[y][x] == 5) {
            let virus = new Virus(x, y)
            virusArr.push(virus)
        }
    }
}
io.on('connection', function (socket) {

    console.log("Connected")

});

function game() {
    //  console.log(stat)
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
    io.sockets.emit('display message', matrix);
    stat.grass = grassArr.length
    stat.grasseater = grassEatArr.length
    stat.predator = predatorArr.length
    stat.mulboost = mulBoostArr.length
    stat.virus = virusArr.length
    console.log(stat)
}

setInterval(game, 1000)



