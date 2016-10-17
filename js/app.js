// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x > 700) {
        this.reset();
    }
    this.x += this.s * dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype.reset = function () {
    this.x = -50;
    this.s = (Math.floor(Math.random() * 3) + 1) * 100;
    var row = Math.floor(Math.random() * 3) + 1;
    switch (row) {
    case 2:
        this.y = 145;
        break;
    case 3:
        this.y = 225;
        break;
    default:
        this.y = 60;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.reset = function () {
    this.x = 300;
    this.y = 320;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {

};

Player.prototype.handleInput = function (dir) {
  console.log(this.x + " " + this.y);
    switch (dir) {
    case 'up':
        this.y > 50 ? this.y -= 83 : this.y;
        break;
    case 'down':
        this.y < 350 ? this.y += 83 : this.y;
        break;
    case 'left':
        this.x > 80 ? this.x -= 101 : this.x;
        break;
    case 'right':
        this.x < 400 ? this.x += 101 : this.x;
        break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
