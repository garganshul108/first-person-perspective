const defaultColor = { r: 255, g: 12, b: 100 };
// qR => Quantum of Rotation
const qR = PI / 10;

function User(x, y, dir, options) {

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
    this.color = options.color ? options.color : defaultColor;


    this.modDir = () => {
        this.dir = this.dir - (floor(this.dir / TWO_PI) * TWO_PI);
    }


    this.rotate = (v) => {
        this.dir += v;
        this.modDir();
    }

    this.rotateRight = () => {
        this.rotate(-qR);
    }

    this.rotateLeft = () => {
        this.rotate(qR);
    }

    this.move = (vx, vy) => {
        this.x += vx;
        this.v += vy;
    }

    this.moveForward = () => {
        let dx = cos(this.dir);
        let dy = sin(this.dir);
        if (abs(dx) > abs(dy)) {
            if (dx > 0) this.move(1, 0);
            else this.move(-1, 0);
        } else {
            if (dy > 0) this.move(0, -1);
            else this.move(0, 1);
        }
    }

    this.moveBackward = () => {
        let originalDir = this.dir;
        this.dir += PI;
        this.moveForward();
        this.dir = originalDir;
    }

    this.moveRight = () => {
        let originalDir = this.dir;
        this.dir += (-PI / 2);
        this.moveForward();
        this.dir = originalDir;
    }

    this.moveLeft = () => {
        let originalDir = this.dir;
        this.dir += (PI / 2);
        this.moveForward();
        this.dir = originalDir;
    }

}