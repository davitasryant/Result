var LivingCreature = require("./class.LivingCreature")
module.exports = class Virus extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        this.directions = [];
    }

    search(ch) {
        this.getNewCoordinates()
        return super.search(ch)
    }

    move() {
        let found = this.search(1);
        var foundRand = this.random(found);
        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            this.x = x
            this.y = y
        }
    }
}