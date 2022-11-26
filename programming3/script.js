let side = 10;
let socket = io()

function setup() {
    frameRate(20);
    createCanvas(60 * side, 60 * side);
    background('#acacac');
}



function draww(matrix) {
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
}


socket.on('display message', draww);
