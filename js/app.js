/* App.js
 * This file creates the player and enemy objects and functions,
 * and then instantiates the objects. There is also a new Game
 * and create Game function.
 */

'use strict';

/*
 * Game Over function
 */
var Game = function() {
    this.gameOver = false;     
};


/* 
 * ENEMY CLASS
 */

// Create enemy constructor
var Enemy = function(x,y) {
    
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // give enemy a random speed
    this.speed = Math.floor((Math.random() * 500) + 1);
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);

    // check for collision
    if ((player.y - this.y == 8) && (this.x > player.x - 75 && this.x < player.x + 75)) {
        player.lives--;
        document.getElementById('lives').innerHTML = 'Lives: ' + player.lives;        

        // check to see if player has any lives left and if they don't, change header message
        if (player.lives === 0) {            
            document.getElementById('title').innerHTML = 'GAME OVER';
            document.getElementById('instructions').innerHTML = 'Click refresh on your browser to play again.';
            game.gameOver = true;            
        } else {            
            player.reset();
        }
    }

    // After bug goes across, put it back at beginning
    if (this.x > 505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* 
 * PLAYER CLASS
 */

var Player = function(x, y) {

    // set the player's image
    this.sprite = 'images/char-boy.png';

    // set the player's location
    this.x = x;
    this.y = y;
    this.lives = 5;
    this.score = 0;
};

// Update player's position
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;

    // check to see if player made it to the top
    if (this.y == -13) {
        
        // add one to the score
        this.score++;
        document.getElementById('score').innerHTML = 'Score: ' + this.score;

        // check to see if player won the game and if so change header message
        if (this.score === 5) {
            document.getElementById('title').innerHTML = 'YOU WIN!';
            document.getElementById('instructions').innerHTML = 'Click refresh on your browser to play again.';
            game.gameOver = true;                
        } else {
            this.reset();
        }
    }        
};

// Render player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player to starting location
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 402;
}

// Function for handling keyboard inputs (player movement) during game
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'right':
            if (this.x < 319) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 402) {
                this.y += 83;
            }
            break;
    }
}


/* 
 * INSTANTIATE OBJECTS
 */

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i=1; i < 5; i++) {
    var enemy = new Enemy(0-i*101, 83*i-21);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player(202, 402);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        87: 'up',
        38: 'up',
        39: 'right',
        68: 'right', 
        40: 'down',            
        83: 'down'                 
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create new game
var game = new Game();
