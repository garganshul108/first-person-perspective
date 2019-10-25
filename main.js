let game;
let width = 1000;
let height = 700;
let rows = 20;
let cols = 5;

function setup() {
    createCanvas(width, height);
    game = new Game(width * 0.2, height * 0.2, rows, cols);
    background(21);
    let vv = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (vv % 7 == 0) game.place(i, j);
            vv += 2;
        }
    }
    game.draw(5, 5);

}

function draw() {

}
