class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
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

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
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
            var newEat = new GrassEater(newCell[0], newCell[1], this.index);
            eatArr.push(newEat);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }
}
class Gishatich extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 30;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
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
 
            matrix[y][x] = 3;
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
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
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
            var newGish = new Gishatich(newCell[0], newCell[1], this.index);
            gishatichArr.push(newGish);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
            }
        }
    }
}
class Taguhi extends LivingCreature {
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

                matrix[y][x] = this.index;
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
class Mat extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 30;
        this.directions = [];
        for (var k = 0; k < matrix.length; k++) {
            if ((x + k) <= matrix[k].length && (y + k) <= matrix.length) {
                var zangvac1 = [];
                var zangvac2 = [];
                var newx1 = x - k;
                var newx2 = x + k;
                var newy1 = y - k;
                var newy2 = y + k;
                zangvac1.push(newx1);
                zangvac2.push(newx2);
                zangvac1.push(newy1);
                zangvac2.push(newy2);
                this.directions.push(zangvac1);
                this.directions.push(zangvac2);
            }
        }
        console.log(this.directions);
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