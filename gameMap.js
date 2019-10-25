function GameMap(width, height, rows, cols) {

    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
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

    console.log("rows", this.rows);
    console.log("cols", this.cols);

    // while (true) {
    //     this.userX = floor(random(1, this.rows - 2));
    //     this.userY = floor(random(1, this.cols - 2));
    //     if (this.design[this.userX][this.userY] != 1) break;
    // }

    this.flip = (v) => {
        if (v == 0) return 1;
        return 0;
    }


    this.place = (x, y, locations) => {
        if (!locations) this.design[x][y] = 1;
        else for (let v of locations) {
            this.design[v.x][v.y] = 1;
        }
    }

    this.unplace = (x, y, locations) => {
        if (!locations) this.design[x][y] = 0;
        else for (let v of locations) {
            this.design[v.x][v.y] = 0;
        }
    }

    this.toggleCell = (x, y, locations) => {
        if (!locations) this.design[x][y] = this.flip(this.design[x][y]);
        else for (let v of locations) {
            this.design[v.x][v.y] = this.flip(this.design[v.x][v.y]);
        }
    }



    console.log("scales:", this.scaleX, this.scaleY);



    this.draw = (topLeftX, topLeftY) => {
        stroke(255);
        noFill();
        rect(topLeftX, topLeftY, this.width, this.height);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.design[i][j] == 1) {
                    console.log("cell", i, j);
                    fill(255);
                    noStroke();
                    rect(topLeftY + j * this.scaleX, topLeftX + i * this.scaleY, this.scaleX, this.scaleY);
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