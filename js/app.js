// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

Enemy.prototype.level = 1;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (this.x > 700) {
        this.reset();
    }
    this.x += this.speed * this.level * dt;


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype.reset = function() {
    this.x = -50;
    this.speed = (Math.floor(Math.random() * 3) + 1) * 100;
    this.setRow(Math.floor(Math.random() * 3) + 2);
};

Enemy.prototype.setRow = function(row) {
    this.row = row;
    this.y = (row - 1) * 83 - 25;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = playerImages[0];
    this.reset();
    this.gemBlue = 0; // total blue gems collected
    this.gemGreen = 0; // total green gems collected
    this.gemOrange = 0; // total orange gems collected
    this.keys = 0; // keys collected 
    this.score = 5; // player life +1 on reaching water
    this.stop = false; // halt the game    
};

Player.prototype.setRow = function(row) {
    this.row = row;
    this.y = (row - 1) * 83 - 13;
};

Player.prototype.setCol = function(col) {
    this.col = col;
    this.x = (this.col - 1) * 101;
};

Player.prototype.reset = function() {
    this.setRow(6);
    this.setCol(3);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function(dt) {
    if (this.stop === true) { // create die animation        
        this.y += this.y * 3 * dt;
    }
};


Player.prototype.handleInput = function(dir) {
    if (player.stop === false) {
        switch (dir) {
            case 'up':
                if (this.row > 1) {
                    this.setRow(this.row - 1); // Increase the score and game level when reach to water
                    if (this.row === 1) {
                        this.score++;
                        Enemy.prototype.level++;
                    }
                }

                break;
            case 'down':
                if (this.row === 1) { // reset when reached to water and pressed down
                    this.reset();
                }
                if (this.row < 6) {
                    this.setRow(this.row + 1);
                }
                break;
            case 'left':
                if (this.col > 1) {
                    this.setCol(this.col - 1);
                }
                break;
            case 'right':
                if (this.col < 5) {
                    this.setCol(this.col + 1);
                }
                break;
            case 'p': // change player avatar
                if (this.row === 5 || this.row == 6) { // only change avatar when player is on the grass 
                    this.setNextPlayerIamge();
                }
                break;
        }
    }
};

Player.prototype.setNextPlayerIamge = function() {
    var index = playerImages.indexOf(this.sprite);
    index += 1;
    if (index == playerImages.length) {
        index = 0;
    }
    this.sprite = playerImages[index];
};

var playerImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png'
];



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p' // change player avatar
    };

    player.handleInput(allowedKeys[e.keyCode]);
});