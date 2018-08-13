/// <reference path="../phaser.d.ts" />

//create a new scene
const gameScene = new Phaser.Scene('Game');
var player;
var treasure;
var dragon;

gameScene.init = function() {
    this.PLAYER_SPEED = 3;
    this.ENEMY_SPEED = 1;
    this.TOP_MAX = 100;
    this.BOTTOM_MAX = this.sys.game.config.height - 100;
}

// Preload assets
gameScene.preload = function() {
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');
}

// Scene create
gameScene.create = function() {
    const gameW = this.sys.game.config.width
    const gameH = this.sys.game.config.height
    const bg = this.add.sprite(0,0, 'background');
    player = this.add.sprite(0, 0, 'player');
    treasure = this.add.sprite(0, 0, 'treasure');
    dragon = this.add.sprite(250,(gameH/2) - treasure.width / 3, 'dragon');
    dragon.setScale(.5);
    dragon.flipX = true;
    bg.setOrigin(0,0);
    player.setOrigin(0,0);
    player.setScale(.5);
    player.setPosition(10, (gameH/2) - player.width / 2);
    treasure.setOrigin(0,0);
    treasure.setScale(.5);
    treasure.setPosition(gameW - treasure.width * 2, (gameH/2) - treasure.width / 2);    
}

gameScene.update = function() {
    if (this.input.activePointer.isDown) {
        player.x += this.PLAYER_SPEED;
    }  

    const playerRect = player.getBounds();
    const treasureRect = treasure.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasure)) {
        this.scene.restart();
        return;
    }

    dragon.y += this.ENEMY_SPEED;

    if (dragon.y <= this.TOP_MAX) {
        this.ENEMY_SPEED *= -1
    } 
    
    if (dragon.y >= this.BOTTOM_MAX){
        this.ENEMY_SPEED *= -1
    }
}

// set the configuration of the game
const config = {
    type: Phaser.AUTO, //Phaser will use WebGL if available or canvas.
    width: 640,
    height: 360,
    scene: gameScene
}

// create a new game pass the configuration
const game = new Phaser.Game(config);