
let side = 10;

function setup() {
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

    frameRate(20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("lightgreen");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }

            else if (matrix[y][x] == 2) {
                fill('yellow');
            }
            else if (matrix[y][x] == 3) {
                fill('red');
            }
            else if (matrix[y][x] == 4) {
                fill('orange');
            }
            else if (matrix[y][x] == 5) {
                fill('darkgreen');
            }
            rect(x * side, y * side, side, side);
        }
    }

    // for (let i in grassArr) {
    //     grassArr[i].mul()
    // }

    // for (let i in grassEatArr) {
    //     grassEatArr[i].eat()
    // }

    // for (let i in predatorArr) {
    //     predatorArr[i].eat()
    // }
    // for (let i in mulBoostArr) {
    //     mulBoostArr[i].move()
    // }
    // for(let i in virusArr){
    //     virusArr[i].move()
    // }
}

