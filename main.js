let game, player;
let width = 1000;
let height = 700;
let rows = 70;
let cols = 100;
let scaleX = 10;
let scaleY = 10;
let topLeftX = 5;
let topLeftY = 5;
let maxDiagonal = 1000;
let looping = true;

let viewAngle = 3 * Math.PI / 4;


function bumpingIntoWall(x, y) {
    return game.design[y][x] !== 0;
}

function setup() {
    createCanvas(width, height);
    game = new Game(width * 0.2, height * 0.2, rows, cols);
    maxDiagonal = dist(0, 0, width * 0.2, height * 0.2);
    game.placeLine(0, 0, 0, cols - 1);
    game.placeLine(0, 0, rows - 1, 0);
    game.placeLine(rows - 1, cols - 1, rows - 1, 0);
    game.placeLine(rows - 1, cols - 1, 0, cols - 1);
    game.placeLine(0, 5, 20, 5);
    game.placeLine(0, 10, 20, 10);
    game.placeLine(0, 20, 20, 20);
    game.placeLine(0, 15, 20, 15);

    // game.placeBlock(25, 10, 2, 3);
    // game.unplaceBlock(4, 5, 22, 10);

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
        console.log("reverted");
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
        // noStroke();
        let op = floor(255 / (pow(d, 3 / 2)));
        // console.log("op", op);
        fill(255, 255, 255, op);
        let cx = divCount * dWidth + dWidth / 2;
        let cy = height / 2;
        let w = dWidth;
        let h = height * (2 / d);
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
            // noStroke();
            fill(lerpColor(floorColor1, floorColor2, mixValue));
            rect(divCount * dWidth, height - (i + 1) * floorSlabHeight, dWidth, floorSlabHeight);
            mixValue += 0.1;
        }

        // DRAWING THE CEILING
        let ceilingColor1 = color(255, 0, 0, 55); // red near
        let ceilingColor2 = color(0, 0, 0, 55); // black dimished far
        let ceilingSlabHeight = 20;
        let noOfCeilingSlabs = floor(((height - h) / 2) / ceilingSlabHeight);
        mixValue = 0;
        for (let i = 0; i < noOfCeilingSlabs; i += 1) {
            // noStroke();
            fill(lerpColor(ceilingColor1, ceilingColor2, mixValue));
            rect(divCount * dWidth, (i) * ceilingSlabHeight, dWidth, ceilingSlabHeight);
            mixValue += 0.1;
        }




        divCount++;
    }

    game.draw(topLeftX, topLeftY);
}
