var app = new PIXI.Application(1600, 900, {
    backgroundColor: 0xFFFFFF
});

const gameLandscapeRatio = 1600 / 900;
var container = new PIXI.Container();
var background = PIXI.Sprite.fromImage('assets/images/flag_background.png');
var bush1Texture = PIXI.Texture.fromImage('assets/images/bush1.png');
var bush2Texture = PIXI.Texture.fromImage('assets/images/bush2.png');
var bush3Texture = PIXI.Texture.fromImage('assets/images/bush3.png');
var bush4Texture = PIXI.Texture.fromImage('assets/images/bush4.png');
var bush5Texture = PIXI.Texture.fromImage('assets/images/bush5.png');
var scoreText = new PIXI.Text('Wang Size: 0.000"', {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Arial',
    fill: 'black',
    align: 'center',
    stroke: '#FFFFFF',
    strokeThickness: 3
});
var startText = new PIXI.Text('Start!', {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Arial',
    fill: 'green',
    align: 'center',
    stroke: '#FFFFFF',
    strokeThickness: 3
});

app.stage.addChild(background);
app.stage.addChild(container);
app.stage.addChild(scoreText);
app.stage.addChild(startText);
document.body.appendChild(app.view);
window.addEventListener("resize", resizeGame);

var currentTexture = 1;
var pointTick = 1000;
var pointTicker;
var tickerActive = false;
var currentPoints = 0;
var currentRound = 1;
var activeIndex = -1;

scoreText.x = app.renderer.width / 2;
startText.x = app.renderer.width / 2;
startText.y = app.renderer.height / 2;
startText.interactive = true;
startText.buttonMode = true;
startText.on('pointerdown', startGame);

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

function startPointTicker () {
    pointTicker = setInterval(function () {
        if (pointTick > 0) pointTick--;
        tickerActive = true;
    }, 1);

    // Preventing race condition incase someone has lighting fingers...
    tickerActive = true;
}

function stopPointTicker () {
    clearInterval(pointTicker);
    tickerActive = false;
}

function onClick() {
    this.alpha = 0;
    this.interactive = false;
    this.buttonMode = false;    

    currentPoints += pointTick;
    scoreText.text = 'Wang Size: ' + Math.max(currentPoints/2500).toFixed(3) + '"';

    if (currentRound < 10) {
        setTimeout(function () {
            activatePoint();
            pointTick = 1000;
            if (!tickerActive) startPointTicker();
            currentRound++;
        }, 500);        
    }
    else {
        startText.text = 'Start a new game!';
        startText.interactive = true;
        startText.buttonMode = true;
        startText.alpha = 1;
        console.log(currentPoints);
    }        
}

function activatePoint() {
    activeIndex = getRandomNumber(0, 143);

    var child = container.getChildAt(activeIndex);
    child.alpha = 1;
    child.interactive = true;
    child.buttonMode = true;

    if (!tickerActive) startPointTicker();
}

function getRandomNumber(min, max) {
    if (min >= max) throw "Invalid random number, please pass in a minimum value that is greater than the maximum value.";
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resizeGame () {
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

function startGame () {
    pointTick = 1000;    
    currentPoints = 0;
    currentRound = 1;
    activeIndex = -1;
    
    startText.interactive = false;
    startText.buttonMode = false;
    startText.alpha = 0;
    activatePoint();
}

resizeGame();