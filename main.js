let game, player;
let width = 1000;
let height = 700;
let rows = 70;
let cols = 100;
let scaleX = 10;
let scaleY = 10;
let topLeftX = 5;
let topLeftY = 5;

let viewAngle = Math.PI / 2;


function bumpingIntoWall(x, y) {
    return game.design[y][x] !== 0;
}

function setup() {
    createCanvas(width, height);
    game = new Game(width * 0.2, height * 0.2, rows, cols);
    game.placeLine(0, 0, 0, cols - 1);
    game.placeLine(0, 0, rows - 1, 0);
    game.placeLine(rows - 1, cols - 1, rows - 1, 0);
    game.placeLine(rows - 1, cols - 1, 0, cols - 1);

    game.placeBlock(50, 20, 5, 7);

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

function keyPressed() {
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
        let d = 10000000;
        for (let r = 0.5; r < 10000; r += 0.5) {
            let xx = floor((player.x * scaleX + scaleX / 2 + r * cos(angle)) / scaleX);
            let yy = floor((player.y * scaleY + scaleY / 2 + r * sin(angle)) / scaleY);
            // console.log("xx yy", xx, yy);
            if (inBounds(xx, 0, cols - 1) && inBounds(yy, 0, rows - 1) && game.design[yy][xx] === 1) {
                d = dist(player.x, player.y, xx, yy);
                break;
            }
        }
        rectMode(CENTER);
        fill(255, 255, 255, 255 / (1 + d));
        rect(divCount * dWidth + dWidth / 2, height / 2, dWidth, height / (d));
        rectMode(CORNER);
        divCount++;
    }


    game.draw(topLeftX, topLeftY);
}
