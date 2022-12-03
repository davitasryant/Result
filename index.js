Grass = require("./programming3/class.grass")
GrassEater = require("./programming3/class.grasseater")
Predator = require("./programming3/class.predator")
Mulboost = require("./programming3/class.mulboost")
Virus = require("./programming3/class.virus")
Trap = require("./programming3/class.trap")

var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("programming3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000);

io.on('connection', function (socket) {

    socket.on('restartTheGame', play)
    console.log("Connected")

});

function play(){
    a = random(grassArr)
    console.log(a)
    x = a.x
    y = a.y
    matrix[y][x] = 5
    for (var i in grassArr) {
        if (x == grassArr[i].x && y == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
        }
    }
    let newVirus = new Virus(x, y);
    virusArr.push(newVirus);

}

stat = {
    grass: 0,
    grasseater: 0,
    predator: 0,
    mulboost: 0,
    virus: 0,
    trap: 0
}
grassArr = [];
grassEatArr = [];
predatorArr = [];
mulBoostArr = [];
virusArr = [];
trapArr = [];
matrix = generate(60, 100, 15, 7, 30, 20, 10)
weather = 1

function generate(matLen, gr, grEat, pred, mB, virus, trap) {
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

    for (let i = 0; i < trap; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }

    return matrix
}

function random(found) {
    return found[Math.floor(Math.random()*found.length)]
}






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
        else if(matrix[y][x] == 6) {
            let trap = new Trap(x, y)
            trapArr.push(trap)
        }
    }
}

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEatArr) {
        grassEatArr[i].eat(weather)
    }

    for (let i in predatorArr) {
        predatorArr[i].eat(weather)
    }
    for (let i in mulBoostArr) {
        mulBoostArr[i].move()
    }
    for (let i in virusArr) {
        virusArr[i].move()
    }
    for (let i in trapArr){
        trapArr[i].eat()
    }
    if (weather == 1) {
        io.sockets.emit('display message', matrix);
    }
    else if (weather == 2) {
        io.sockets.emit('display message', matrix);
    }
    else if (weather == 3) {
        io.sockets.emit('display message', matrix);
    }
    else if (weather == 4) {
        io.sockets.emit('display message1', matrix);
    }
    io.sockets.emit('get weather', weather);
    io.sockets.emit('grass', stat);
    stat.grass = grassArr.length
    stat.grasseater = grassEatArr.length
    stat.predator = predatorArr.length
    stat.mulboost = mulBoostArr.length
    stat.virus = virusArr.length
    stat.trap = trapArr.length
    console.log(stat)
}

function weat() {
    weather++
    if (weather > 4) {
        weather = 1
    }
    console.log(weather)
}


setInterval(weat, 5000)
setInterval(game, 500)












