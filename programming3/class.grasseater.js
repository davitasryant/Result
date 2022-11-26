var LivingCreature = require("./class.LivingCreature")
module.exports = class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.directions = [];
    }

    search(ch) {
        this.getNewCoordinates()
        return super.search(ch)
    }

    mul() {
        let found = this.search(0);
        var foundRand = this.random(found);

        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2
            let newGrassEat = new GrassEater(x, y);
            grassEatArr.push(newGrassEat);
            this.energy = 3
        }

    }

    move() {
        this.energy--
        let found = this.search(0);
        var foundRand = this.random(found);
        if (foundRand && this.energy >= 0) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        } else {
            this.die()
        }
    }

    eat() {
        let found = this.search(1);
        var foundRand = this.random(found);
        let found1 = this.search(4);
        let found1Rand = this.random(found1);
        let found2 = this.search(5)
        let found2Rand = this.random(found2)
        if (found1Rand) {
            let x = found1Rand[0];
            let y = found1Rand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.mul()
            for (var i in mulBoostArr) {
                if (x == mulBoostArr[i].x && y == mulBoostArr[i].y) {
                    mulBoostArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (found2Rand) {
            let x = found2Rand[0];
            let y = found2Rand[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.die()
            for (let i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                   virusArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (foundRand) {
            this.energy++
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy > 35) {
                this.mul()
            }

        }



        else {
            this.move()
        }

    }


    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEatArr) {
            if (this.x == grassEatArr[i].x && this.y == grassEatArr[i].y) {
                grassEatArr.splice(i, 1);
                break;
            }
        }
    }

}