let game;
let width = 1000;
let height = 700;
let rows = 20;
let cols = 20;

function setup() {
    createCanvas(width, height);
    game = new Game(width * 0.2, height * 0.2, rows, cols);
    // game.placeLine(0, 0, 0, cols - 1);
    // game.placeLine(0, 0, rows - 1, 0);
    // game.placeLine(rows - 1, cols - 1, rows - 1, 0);
    // game.placeLine(rows - 1, cols - 1, 0, cols - 1);

    game.placeBlock(1, 1, rows - 2, cols - 2);


}
let itr = 0;
function draw() {
    background(22);
    game.draw(5, 5);
    if (itr > 500) noLoop();
    console.log(itr);
    itr++;
}
