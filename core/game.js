function Game(width, height, rows, cols) {

    // dimensions of the map-display window
    this.width = width;
    this.height = height;

    // dimensions of the map
    this.cols = cols;
    this.rows = rows;

    this.scaleX = this.width / this.cols;
    this.scaleY = this.height / this.rows;

    // map
    this.design = [];
    this.player = undefined;

    /**
     * Initialization of the map
     * 
     * At the beginning the map doesn't contains
     * any walls or boundaries
     * 
     * 
     * Legends
     * 0 => Empty Space
     * 1 => Filled Space (Block/Wall)
     * 
     ***/
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

    /**
     * @function
     * - Places block on the desired location
     * - Contiguous Blocks represent a wall
     * 
     * @params (x, y, locations)
     * x, y: coordinates of a loction
     * locations: @array of @object {x, y}
     * 
     */
    this.place = (y, x, locations) => {
        if (!locations) this.design[y][x] = 1;
        else for (let v of locations) {
            this.design[v.y][v.x] = 1;
        }
    }


    /**
     * @function
     * - Places contiguous block
     *   from start to end
     * 
     * - The Line can only be
     *   verticle or horizontal
     * 
     * @params (x1, y1, x2, y2)
     * x1, y1 : starting point
     * x2, y2 : ending points 
     **/

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

    /**
     * @function
     * - Places rectangular block
     *   from top-left to bottom-right corners
     *    
     * @params (x1, y1, x2, y2)
     * x1, y1 : corner 1
     * x2, y2 : corner 2
     *  
     **/
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


    this.unplaceBlock = (y1, x1, y2, x2) => {
        for (let i = min(y1, y2); i <= max(y1, y2); i++) {
            for (let j = min(x1, x2); j <= max(x1, x2); j++) {
                this.unplace(i, j);
            }
        }
    }

    this.toggleCell = (y, x, locations) => {
        if (!locations) this.design[y][x] = this.flip(this.design[y][x]);
        else for (let v of locations) {
            this.design[v.y][v.x] = this.flip(this.design[v.y][v.x]);
        }
    }


    /***
     * @function
     * - adds the players to the game board
     * 
     * @params
     * - object of the Player (./player.js)
     *
     */

    this.addPlayer = (player) => {
        this.player = player;
    }




    /***
     * @function
     * - Draws the 2D grid of the map
     * - Player loaction
     * - FOV of the player
     * 
     * @params
     * - topLeftX, topLeftY: top-left corner of the display window
     */

    this.draw = (topLeftX, topLeftY) => {

        // boundaries of the map
        stroke(255);
        fill(10);
        rect(topLeftX, topLeftY, this.width, this.height);

        // drawing blocks
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
            stroke(200, 200, 200, 15);
            // strokeWeight(2);

            // drawing the FOV of the player
            for (let angle = this.player.dir - viewAngle / 2; angle <= this.player.dir + viewAngle / 2; angle += PI / 200) {
                let r = 50;
                line(topLeftX + this.player.x * this.scaleX + this.scaleX / 2,
                    topLeftY + this.player.y * this.scaleY + this.scaleY / 2,
                    topLeftX + this.player.x * this.scaleX + this.scaleX / 2 + r * cos(angle),
                    topLeftY + this.player.y * this.scaleY + this.scaleY / 2 + r * sin(angle));
            }
        }

    }

}