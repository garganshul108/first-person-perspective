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


    this.rotate = (v) => {
        this.dir += v;
    }

    this.rotateRight = () => {
        this.rotate(-qR);
    }

    this.rotateLeft = () => {
        this.rotate(qR);
    }

}