function Game(width, height, rows, cols) {

    this.width = width;
    this.height = height;
    this.cols = cols;
    this.rows = rows;
    this.scaleX = this.width / this.cols;
    this.scaleY = this.height / this.rows;
    this.design = [];

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
        // console.log("user cell", this.userX, this.userY);
        // fill(255, 10, 121);
        // noStroke();
        // rect(topLeftX + this.userX * this.scaleX, topLeftY + this.userY * this.scaleY, this.scaleX, this.scaleY);




        console.log("map is drawn");
    }



}