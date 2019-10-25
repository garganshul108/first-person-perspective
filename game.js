function Game(width, height, rows, cols) {

    this.width = width;
    this.height = height;
    this.cols = cols;
    this.rows = rows;
    this.scaleX = this.width / this.cols;
    this.scaleY = this.height / this.rows;
    this.design = [];
    this.player = undefined;

    // initialization of the map
    for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
            row.push(0);
        }
        this.design.push(row);
    }

    this.flip = (v) => {
        if (v == 0) return 1;
        return 0;
    }


    this.place = (y, x, locations) => {
        if (!locations) this.design[y][x] = 1;
        else for (let v of locations) {
            this.design[v.y][v.x] = 1;
        }
    }

    this.placeLine = (y1, x1, y2, x2) => {
        if (y1 == y2) {
            for (let j = min(x1, x2); j <= max(x1, x2); j++) {
                this.place(y1, j);
            }
        } else if (x1 == x2) {
            for (let i = min(y1, y2); i <= max(y1, y2); i++) {
                this.place(i, x1);
            }
        }
    }

    this.placeBlock = (y1, x1, y2, x2) => {
        for (let i = min(y1, y2); i <= max(y1, y2); i++) {
            for (let j = min(x1, x2); j <= max(x1, x2); j++) {
                this.place(i, j);
            }
        }
    }

    this.unplace = (y, x, locations) => {
        if (!locations) this.design[y][x] = 0;
        else for (let v of locations) {
            this.design[v.y][v.x] = 0;
        }
    }

    this.toggleCell = (y, x, locations) => {
        if (!locations) this.design[y][x] = this.flip(this.design[y][x]);
        else for (let v of locations) {
            this.design[v.y][v.x] = this.flip(this.design[v.y][v.x]);
        }
    }


    this.addPlayer = (player) => {
        this.player = player;
    }

    this.draw = (topLeftX, topLeftY) => {
        stroke(255);
        noFill();
        rect(topLeftX, topLeftY, this.width, this.height);

        // drawing map
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.design[i][j] == 1) {
                    fill(255);
                    noStroke();
                    rect(topLeftX + j * this.scaleX, topLeftY + i * this.scaleY, this.scaleX, this.scaleY);
                }
            }
        }

        // drawing user
        if (this.player) {
            fill(this.player.color.r, this.player.color.g, this.player.color.b);
            noStroke();
            rect(topLeftX + this.player.x * this.scaleX, topLeftY + this.player.y * this.scaleY, this.scaleX, this.scaleY);
            stroke(10, 166, 255);
            line(topLeftX + this.player.x * this.scaleX, topLeftY + this.player.y * this.scaleY, topLeftX + this.player.x * this.scaleX + 20 * cos(this.player.dir), topLeftY + this.player.y * this.scaleY + 20 * sin(this.player.dir));
        }


        // console.log("map is drawn");
    }



}