var LivingCreature = require('./LivingCreature')
module.exports = class Mat extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 30;
        this.directions = [];
        for (var k = 0; k < matrix.length; k++) {
            if ((x + k) <= matrix[k].length && (y + k) <= matrix.length) {
                var zangvac1 = [this.x - k, this.y - k];
                var zangvac2 = [this.x + k, this.y + k];
                this.directions.push(zangvac1);
                this.directions.push(zangvac2);
            }
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

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(3);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in gishatichArr) {
                if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                }
            }
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }
        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) { 
                this.die();
            }
        }
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newMat = new Mat(newCell[0], newCell[1], this.index);
            matArr.push(newMat);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in matArr) {
            if (this.x == matArr[i].x && this.y == matArr[i].y) {
                matArr.splice(i, 1);
            }
        }
    }
}