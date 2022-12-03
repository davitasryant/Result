var LivingCreature = require("./class.LivingCreature")
module.exports = class Trap extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions = [];
    }

    search(ch) {
        this.getNewCoordinates()
        return super.search(ch)
    }

    eat() {
        let found = this.search(2);
        var foundRand = this.random(found);
        let found1 = this.search(3)
        let foundRand1 = this.random(found1)
        let found2 = this.search(4)
        let foundRand2 = this.random(found2)
        let found3 = this.search(5)
        let foundRand3 = this.random(found3)
        if (foundRand) {
            this.multiplay++;
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 0
            for (var i in grassEatArr) {
                if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiplay >= 3) {
                this.die();
            }
        }
        if (foundRand1) {
            this.multiplay++;
            let x = foundRand1[0];
            let y = foundRand1[1];
            matrix[y][x] = 0
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiplay >= 3) {
                this.die();
            }
        }
        if (foundRand2) {
            this.multiplay++;
            let x = foundRand2[0];
            let y = foundRand2[1];
            matrix[y][x] = 0
            for (var i in mulBoostArr) {
                if (x == mulBoostArr[i].x && y == mulBoostArr[i].y) {
                    mulBoostArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiplay >= 3) {
                this.die();
            }
        }
        if (foundRand3) {
            this.multiplay++;
            let x = foundRand3[0];
            let y = foundRand3[1];
            matrix[y][x] = 0
            for (var i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                    virusArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiplay >= 3) {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in trapArr) {
            if (this.x == trapArr[i].x && this.y == trapArr[i].y) {
                trapArr.splice(i, 1);
                break;
            }
        }
    }
}