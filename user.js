function user(x, y, dir, color) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.color = color;

    this.move = (vx, vy) => {
        this.x = this.x + vx;
        this.y = this.y + vy;
    }

    this.right = () => {
        this.move(1, 0);
    }

    this.left = () => {
        this.move(-1, 0);
    }

    this.up = () => {
        this.move(0, -1);
    }

    this.down = () => {
        this.move(0, 1);
    }

}