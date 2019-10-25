
let gameMap = undefined;
let width = 1000;
let height = 700;

/**
 * XXXXXXXXXXXXXXXXXXXX
 * X                  X
 * X                  X  
 * X                  X
 * X        X         X
 * X        X         X
 * X        X         X
 * X        XXXX      X
 * X                  X
 * X                  X  
 * XXXXXXXXXXXXXXXXXXXX
 * 
 * 
 */
let c = 255;
function setup() {
    createCanvas(width, height);
    gameMap = new GameMap(width * 0.2, height * 0.2, 5, 20);
    background(21);
    gameMap.place(3, 4)
    gameMap.draw(15, 1);

}

function draw() {
    // // frameRate(5);
    // background(c);
    // c += (-5);
    // if (c < 21) noLoop();
    // console.log("looping", c);

}
