var LivingCreature = require('./LivingCreature')
module.exports = class Taguhi extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 30;
        this.directions = [];
        for (var l = 0; l < matrix.length; l++) {
            var zangvac = [];
            var newX = l;
            var newY = y;
            zangvac.push(newX);
            zangvac.push(newY);
            this.directions.push(zangvac);
        }
    }
    getNewCoordinates() {
        this.directions;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(2);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy = this.energy + 2;
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }
        } else {
            var fundCords = this.chooseCell(1);
            var cord = random(fundCords);

            if (cord) {
                var x = cord[0];
                var y = cord[1];

                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;

                this.energy++;

                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
            } else { 
                this.move();
                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in taguhiArr) {
            if (this.x == taguhiArr[i].x && this.y == taguhiArr[i].y) {
                taguhiArr.splice(i, 1);
            }
        }
    }
}