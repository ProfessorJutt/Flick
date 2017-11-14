var app = new PIXI.Application(1600, 900, {backgroundColor : 0xFFFFFF});
//0xDBDBDB
document.body.appendChild(app.view);

var container = new PIXI.Container();

app.stage.addChild(container);

var textureActive = PIXI.Texture.fromImage('assets/images/active.png');

// Create a 12x12 Grid
for (var i = 0; i < 144; i++) {
    let point = new PIXI.Sprite(textureActive); 
    point.on('pointerdown', onClick);   
    point.anchor.set(0.5);
    point.x = (i % 12) * 50;
    point.y = Math.floor(i / 12) * 50;
    point.alpha = 0;
    container.addChild(point);
}

function onClick () {
    this.alpha = 0;
    this.interactive = false;
    this.buttonMode = false;
    activatePoint();
}

function activatePoint() {
    var child = container.getChildAt(Math.floor(Math.random() * (144 - 0)));
    child.alpha = 1;
    child.interactive = true;
    child.buttonMode = true;    
}

activatePoint();

// Center on the screen
container.x = (app.renderer.width - container.width) / 2;
container.y = (app.renderer.height - container.height) / 2;