var app = new PIXI.Application(1600, 900, {
    backgroundColor: 0xFFFFFF
});

const gameLandscapeRatio = 1600 / 900;

document.body.appendChild(app.view);

var container = new PIXI.Container();

var background = PIXI.Sprite.fromImage('assets/images/flag_background.png');

window.addEventListener("resize", resizeGame);

app.stage.addChild(background);
app.stage.addChild(container);

var currentTexture = 1;
var bush1Texture = PIXI.Texture.fromImage('assets/images/bush1.png');
var bush2Texture = PIXI.Texture.fromImage('assets/images/bush2.png');
var bush3Texture = PIXI.Texture.fromImage('assets/images/bush3.png');
var bush4Texture = PIXI.Texture.fromImage('assets/images/bush4.png');
var bush5Texture = PIXI.Texture.fromImage('assets/images/bush5.png');

// Create a 12x12 Grid
for (var i = 0; i < 144; i++) {
    let point = new PIXI.Sprite(getTexture());
    point.on('pointerdown', onClick);
    point.anchor.set(0.5);
    point.x = (i % 12) * 50;
    point.y = Math.floor(i / 12) * 50;
    point.alpha = 0;
    container.addChild(point);
}

function getTexture() {
    var texture = null;
    if (currentTexture == 1) texture = bush1Texture;
    else if (currentTexture == 2) texture = bush2Texture;
    else if (currentTexture == 3) texture = bush3Texture;
    else if (currentTexture == 4) texture = bush4Texture;
    else {
        texture = bush5Texture;
        currentTexture = 0;
    }
    currentTexture++;
    return texture;
}

function onClick() {
    this.alpha = 0;
    this.interactive = false;
    this.buttonMode = false;
    setTimeout(function () {
        activatePoint();
    }, 500);
}

function activatePoint() {
    var child = container.getChildAt(getRandomNumber(0, 143));
    child.alpha = 1;
    child.interactive = true;
    child.buttonMode = true;
}

function getRandomNumber(min, max) {
    if (min >= max) throw "Invalid random number, please pass in a minimum value that is greater than the maximum value.";
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resizeGame() {
    // Buffer for the window...
    var buffer = 21;

    // Resize
    app.renderer.resize(window.innerWidth - buffer, window.innerHeight - buffer);

    var bg = app.stage.getChildAt(0);

    bg.width = window.innerWidth - buffer;
    bg.height = window.innerHeight - buffer;

    // Center on the screen
    container.x = (app.renderer.width - container.width) / 2;
    container.y = (app.renderer.height - container.height) / 2;
}

resizeGame();
activatePoint();