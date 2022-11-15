class Predator extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.directions = [];
    }

    search(ch) {
        this.getNewCoordinates()
        return super.search(ch)
    }

    move() {
        this.energy--
        let found = this.search(0);
        var foundRand = random(found);
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

    mul() {
        let found = this.search(0);
        var foundRand = random(found);

        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3
            let pred = new Predator(x, y);
            predatorArr.push(pred);
            this.energy = 3
        }
    }

    eat() {
        let found = this.search(1);
        var foundRand = random(found);
        let found1 = this.search(2)
        let foundRand1 = random(found1)
        let found2 = this.search(4)
        let foundRand2 = random(found2)
        let found3 = this.search(5)
        let foundRand3 = random(found3)
        if (foundRand1) {
            this.energy++
            let x = foundRand1[0];
            let y = foundRand1[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassEatArr) {
                if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 75) {
                this.mul();

            }
        }

        else if (foundRand2) {
            let x = foundRand2[0];
            let y = foundRand2[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.mul()
            for (let i in mulBoostArr) {
                if (x == mulBoostArr[i].x && y == mulBoostArr[i].y) {
                    mulBoostArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (foundRand3) {
            let x = foundRand3[0];
            let y = foundRand3[1];
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
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 75) {
                this.mul();

            }
        }
        else {
            this.move()
        }

    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}