let game, player;
let width = 1000;
let height = 700;
let rows = 50;
let cols = 35;


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

    // game.placeBlock(1, 1, rows - 2, cols - 2);
    let px, py;

    while (true) {
        px = floor(random(0, cols - 1));
        py = floor(random(0, rows - 1));
        if (!bumpingIntoWall(px, py)) break;
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



    game.draw(5, 5);
    // if (itr > 500) noLoop();
    // console.log(itr);
    // itr++;
}
