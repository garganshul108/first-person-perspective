let game, player;
let scaleX = 10;
let scaleY = 10;
let topLeftX = 5;
let topLeftY = 5;
let maxDiagonal = 1000;
let looping = true;


function bumpingIntoWall(x, y) {
    return game.design[y][x] !== 0;
}

function setMap() {

    const lines = [
        [10, 20, 10, 60],
        [10, 70, 10, 90],
        [10, 20, 55, 20],
        [60, 20, 60, 40],
        [60, 50, 60, 60],
        [60, 60, 50, 60],
        [40, 60, 30, 60],
        [60, 60, 60, 70],
        [60, 70, 60, 90],
        [60, 90, 10, 90],
        [40, 20, 40, 30],
        [50, 35, 50, 40],
        [45, 35, 50, 35],
        [25, 30, 25, 40],
        [25, 35, 45, 35],
        [20, 40, 40, 40],
        [50, 40, 60, 40],
        [20, 45, 20, 65],
        [20, 55, 35, 55],
        [30, 50, 40, 50],
        [40, 50, 40, 60],
        [45, 80, 55, 80],
        [50, 70, 60, 70],
        [30, 75, 35, 75],
        [20, 70, 30, 70],
        [50, 85, 50, 90],
        [30, 75, 30, 90],
        [20, 70, 20, 90],
        [40, 70, 40, 90],
        [50, 0, 50, 10],
        [55, 0, 55, 10],
        [60, 0, 60, 10],
        [65, 0, 65, 10],
        [69, 0, 69, 99],
        [0, 0, 69, 0],
        [0, 0, 0, 99],
        [0, 99, 69, 99]
    ]
        ;

    for (let l of lines) {
        game.placeLine(l[0], l[1], l[2], l[3]);
    }

}

function setup() {
    createCanvas(width, height);
    game = new Game(width * 0.2, height * 0.2, rows, cols);
    maxDiagonal = dist(0, 0, width * 0.2, height * 0.2);
    setMap();
    // initial positions of a player
    let px, py;
    let safeTries = 1000;
    while (safeTries--) {
        px = floor(random(0, cols - 1));
        py = floor(random(0, rows - 1));
        if (!bumpingIntoWall(px, py)) break;
    }
    if (safeTries === 0) {
        location.reload();
    }

    player = new Player(px, py, random(0, TWO_PI));
    game.addPlayer(player);

}
let itr = 0;

function inBounds(v, low, high) {
    return v <= high && v >= low;
}


function advanceMove(move) {
    let iX = player.x;
    let iY = player.y;
    move();
    if (!inBounds(player.x, 0, cols - 1) || !inBounds(player.y, 0, rows - 1) || bumpingIntoWall(player.x, player.y)) {
        player.x = iX;
        player.y = iY;
    }
}

function keyReleased() {
    setTimeout(() => {
        noLoop();
        looping = false;
    }, 1000 * 2);
}

function keyPressed() {
    if (!looping) { loop(); looping = true; }
    if (keyCode === 65) {
        player.rotateRight();
    }
    else if (keyCode === 68) {
        player.rotateLeft();
    }
    else if (keyCode === UP_ARROW) {
        advanceMove(player.moveForward);
    }
    else if (keyCode === DOWN_ARROW) {
        advanceMove(player.moveBackward);
    }
    else if (keyCode === RIGHT_ARROW) {
        advanceMove(player.moveRight);
    }
    else if (keyCode === LEFT_ARROW) {
        advanceMove(player.moveLeft);
    }

}

function draw() {
    // console.log("drawing");

    background(22);

    let dAngle = PI / 200;
    // console.log("dAngle", dAngle);
    let noOfDivisions = floor(viewAngle / dAngle);
    // console.log("noOfDiv", noOfDivisions);
    let dWidth = width / noOfDivisions;
    // console.log("dWidth", dWidth);

    let divCount = 0;
    for (let angle = player.dir - viewAngle / 2; angle <= player.dir + viewAngle / 2; angle += dAngle) {
        // console.log("divCount", divCount);
        let d = maxDiagonal;
        for (let r = 0.1; r < maxDiagonal + 0.1; r += 0.1) {
            let xx = player.x + floor((r * cos(angle)) / scaleX);
            let yy = player.y + floor((r * sin(angle)) / scaleY);
            // console.log("xx yy", xx, yy);
            if (!(inBounds(xx, 0, cols - 1) && inBounds(yy, 0, rows - 1))) {
                break;
            }
            else if (inBounds(xx, 0, cols - 1) && inBounds(yy, 0, rows - 1) && game.design[yy][xx] === 1) {
                d = dist(player.x, player.y, xx, yy);
                break;
            }

        }

        // console.log("d", d);

        rectMode(CENTER);
        stroke(75);
        let op = floor(255 / (pow(d, 3 / 2)));
        // console.log("op", op);
        fill(255, 255, 255, op);
        let cx = divCount * dWidth + dWidth / 2;
        let cy = height / 2;
        let w = dWidth;
        let h = height * (2 / (d * pow(cos(angle - player.dir), 0)));
        // console.log("h", h);
        rect(cx, cy, w, h);
        rectMode(CORNER);

        // DRAWING THE FLOOR
        let floorColor1 = color(255, 0, 0, 55); // red near
        let floorColor2 = color(0, 0, 0, 55); // black dimished far
        let floorSlabHeight = 20;
        let noOfFloorSlabs = floor(((height - h) / 2) / floorSlabHeight);
        let mixValue = 0;
        for (let i = 0; i < noOfFloorSlabs; i += 1) {
            // stroke(11);
            noStroke();
            fill(lerpColor(floorColor1, floorColor2, mixValue));
            rect(divCount * dWidth, height - (i + 1) * floorSlabHeight, dWidth, floorSlabHeight);
            mixValue += 0.067;
        }

        // DRAWING THE CEILING
        let ceilingColor1 = color(255, 0, 0, 55); // red near
        let ceilingColor2 = color(20, 20, 20, 55); // black dimished far
        let ceilingSlabHeight = 20;
        let noOfCeilingSlabs = floor(((height - h) / 2) / ceilingSlabHeight);
        mixValue = 0;
        for (let i = 0; i < noOfCeilingSlabs; i += 1) {
            // stroke(11);
            fill(lerpColor(ceilingColor1, ceilingColor2, mixValue));
            rect(divCount * dWidth, (i) * ceilingSlabHeight, dWidth, ceilingSlabHeight);
            mixValue += 0.067;
        }

        // console.log("Ciel", noOfCeilingSlabs);




        divCount++;
    }

    game.draw(topLeftX, topLeftY);
}
