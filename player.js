const defaultColor = { r: 255, g: 12, b: 100 };
// qR => Quantum of Rotation
const qR = Math.PI / 30;

function Player(x, y, dir, options) {

    // initial location of the user
    // @coordinate points(x, y)
    this.x = x;
    this.y = y;

    // direction facing => used for movement
    // @angle
    this.dir = dir;

    // optional property
    // color
    // @object {r, g, b}
    this.color = options ? (options.color ? options.color : defaultColor) : defaultColor;


    this.modDir = () => {
        this.dir = this.dir + 2 * TWO_PI;
        this.dir = this.dir - (floor(this.dir / TWO_PI) * TWO_PI);
        if (this.dir < 0) this.dir = this.dir + TWO_PI;
    }


    this.rotate = (v) => {
        this.dir = this.dir + v;
        this.modDir();

        // console.log("dir", this.dir);
    }

    this.rotateRight = () => {
        this.rotate(-qR);
    }

    this.rotateLeft = () => {
        this.rotate(qR);
    }

    this.move = (vx, vy) => {
        // console.log("vx vy", vx, vy);
        this.x += vx;
        this.y += vy;
        // console.log("x y", this.x, this.y);
    }

    this.moveForward = () => {
        let dx = cos(this.dir);
        let dy = sin(this.dir);
        if (this.dir <= PI / 8) this.move(1, 0);
        else if (this.dir <= PI / 8 + PI / 4) this.move(1, 1);
        else if (this.dir <= PI / 8 + PI / 2) this.move(0, 1);
        else if (this.dir <= PI / 8 + 3 * PI / 4) this.move(-1, 1);
        else if (this.dir <= PI / 8 + PI) this.move(-1, 0);
        else if (this.dir <= PI / 8 + 5 * PI / 4) this.move(-1, -1);
        else if (this.dir <= PI / 8 + 3 * PI / 2) this.move(0, -1);
        else if (this.dir <= PI / 8 + 7 * PI / 4) this.move(1, -1);
        else this.move(1, 0);
    }

    this.moveBackward = () => {
        let originalDir = this.dir;
        this.dir += PI;
        this.modDir();
        this.moveForward();
        this.dir = originalDir;
    }

    this.moveLeft = () => {
        let originalDir = this.dir;
        this.dir += (-PI / 2);
        this.modDir();
        this.moveForward();
        this.dir = originalDir;
    }

    this.moveRight = () => {
        let originalDir = this.dir;
        this.dir += (PI / 2);
        this.modDir();
        this.moveForward();
        this.dir = originalDir;
    }

}