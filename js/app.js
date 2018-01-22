// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.xLimit = 101*getRandomIntInclusive(5,15);
    this.y = y;
    this.speed = getRandomIntInclusive(1,4);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //console.log(this.x);
    if(this.x>this.xLimit){
      this.x=1;
      this.y=getRandomIntInclusive(1,3)*83-42.5;
      this.speed = getRandomIntInclusive(1,4);
    }
    this.x = this.x+this.speed;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.lifes = 3;
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(){
    // Checks for collisions
    allEnemies.forEach(function(enemy){
      if(enemy.x - player.x < 50 && enemy.x - player.x > -50 && enemy.y - player.y < 20 && enemy.y - player.y > -20){
          player.x = 101*2;
          player.y = 5*83-42.5;
          player.lifes -= 1;


      }
    })
}
Player.prototype.handleInput = function(val){
  if(this.lifes != 0){
    if (val=="left" && this.x>0){
        this.x -= 101;
    }
    else if (val=="right" && this.x<404){
        this.x += 101;
    }
    else if (val=="up" && this.y>-42.5){
        this.y -= 83;
    }
    else if(val=="down" && this.y<5*83-42.5){
        this.y += 83;
    }
  }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    for(var i = 0; i<this.lifes;i++){
        ctx.drawImage(Resources.get('images/Heart.png'), 5+30*i, 505,30,30);
    }
};


// Function that generates integers between a range (endpoints inclusive)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var player = new Player(101*2,5*83-42.5);
var allEnemies = [];
for (var i = 0; i < 5; i++){
    allEnemies.push(new Enemy(101*getRandomIntInclusive(0,10),getRandomIntInclusive(1,3)*83-42.5));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
