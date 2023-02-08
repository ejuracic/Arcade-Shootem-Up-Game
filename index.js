const canvas = document.querySelector('canvas'); //getting a const variable to be assigned to canvas for resizing
const canvasContext = canvas.getContext('2d'); //making the canvas know that this is gonna be a 2D game

//const declarations to avoid use of magic numbers
const canvasWidth = 1024;
const canvasHeight = 576;

const boundary = 50;

const playerMaxBoundary = 950;
const enemyMaxBoundary = 965;

const fillTextOne = 40;
const fillTextTwo = 125;

canvas.width = canvasWidth; //width of the canvas is gonna be 1024 pixels
canvas.height = canvasHeight; //height of the canvas is gonna be 576 pixels

canvasContext.fillRect(0,0, canvas.width, canvas.height); //filling the canvas so we can see it appear on the website

var record = "Hit!";        //what to display upon bulelt colliding with enemy

//class to contain elements and variables that make up a "sprite"
class Sprite
{
    //defining properties that make up a sprite
    //position and velocity are wrapped together as one arguement so either one is needed but not required
    constructor({position, velocity}, width, height)
    {
        this.position = position;
        this.velocity = velocity
        this.width = width;
        this.height = height
    }

    //defining how the sprite will look like
    draw()
    {
        canvasContext.fillStyle = 'red' //colouring the sprite
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height); //setting the position of the sprite
    }

    //this method moves the sprites
    update()
    {
        this.draw();

        //enemy hitbox
        var leftEnemyX = enemy.position.x;
        var rightEnemyX = enemy.position.x + enemy.height;
        var upperEnemyY = enemy.position.y;
        var bottomEnemyY = enemy.position.y + enemy.height;
        
        //bullet hitbox
        var leftBulletX = bullet.position.x;
        var rightBulletX = bullet.position.x + bullet.height;
        var upperBulletY = bullet.position.y;
        var bottomBulletY = bullet.position.y + bullet.height;
        
        
        //this if statement checks the boundaries of the canvas width. If the player is greater or equal to 0 AND less than or equal to 
        //974 then the player can move to the right
        if (this.position.x >= 0 && this.position.x <= canvas.width - boundary)
        {
            this.position.x += this.velocity.x;
        }
        //this if statement states that if it is less than or equal to 0 then set the position to 0 to avoid out of the canvas on the left
        if (this.position.x <= 0)
        {
            this.position.x = this.velocity.x;
        }
        //this if statement ensures that the player doesnt go out of the canvas on the right
        if (this.position.x > canvas.width - 50)
        {
            this.position.x -= this.velocity.x;
        }


        if (enemy.position.x >= 0 && enemy.position.x <= canvas.width - boundary)
        {
            enemy.position.x += enemy.velocity.x;
        }
        //this if statement states that if it is less than or equal to 0 then set the position to 0 to avoid out of the canvas on the left
        if (enemy.position.x <= 0)
        {
            enemy.position.x += enemy.velocity.x;
        }
        //this if statement ensures that the player doesnt go out of the canvas on the right
        if (enemy.position.x >= playerMaxBoundary)
        {
            enemy.position.x -= enemy.velocity.x;
        }

        if(bottomEnemyY >= upperBulletY && upperEnemyY <= bottomBulletY && leftEnemyX <= rightBulletX && rightEnemyX >= leftBulletX)
        {
            bullet.hit = true;
        }
    }
}

class Bullet
{
    //defining properties that make up a bullet
    //position and velocity are wrapped together as one arguement so either one is needed but not required
    constructor({position, velocity}, width, height, hit)
    {
        this.position = position;
        this.velocity = velocity
        this.width = width;
        this.height = height
        this.hit = hit;
    }

    //defining how the sprite will look like
    draw()
    {
        canvasContext.fillStyle = 'green' //colouring the bullet
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height, this.hit); //setting the position of the bullet
    }

    update()
    {
        
        if(!bullet.hit)
        {
            this.draw();
        }

        if (keys.w.pressed)
        {
            bullet.hit = false;
            bullet.position.y += bullet.velocity.y;
        }
        
    }
}

const bullet = new Bullet(
    {
        position:
        {
            x:10, 
            y:475
        },
        velocity:
        {
            x:0,
            y:0
        }
    },         
    width = 10,
    height = 10,
    hit = false
);

//instantiating a player of the sprite class
const player = new Sprite(
    {
        position:
        {
            x:0, 
            y:425
        },
        velocity:
        {
            x:0,
            y:0
        },
    },
    width = 50,
    height = 150
    
);

//instantiating an enemy of the sprite class
const enemy = new Sprite(
    {
        position:
        {
            x:0, 
            y:0
        },
        velocity:
        {
            x:0,
            y:0
        },
        width: 50,
        height: 150
    },
    width = 50,
    height = 150
    
);

const keys =
{
    a:
    {
        pressed: false
    },
    d:
    {
        pressed: false
    },
    w:
    {
        pressed: false
    }
}

let lastKey

//infinite loop to continously animate
function animation()
{
    window.requestAnimationFrame(animation);
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0,0, canvas.width, canvas.height);

    player.update(); //adding the player to the canvas
    enemy.update(); //adding the enemy to the canvas

    var leftEnemyX = enemy.position.x;
    var rightEnemyX = enemy.position.x + enemy.height;
    var upperEnemyY = enemy.position.y;
    var bottomEnemyY = enemy.position.y + enemy.height;

    var leftBulletX = bullet.position.x;
    var rightBulletX = bullet.position.x + bullet.height;
    var upperBulletY = bullet.position.y;
    var bottomBulletY = bullet.position.y + bullet.height;

    player.velocity.x = 0;

    //the following if statements enable movement for the enemy
    if (enemy.position.x <= 0)  //if equal or below 0 then sets the velocity to 5
    {
        enemy.velocity.x = 5;
    }
    if (enemy.position.x == enemyMaxBoundary)    //if equal to max boundary to hit edge and bounce to other direction
    {
        enemy.velocity.x = -5;
    }

    //these if statements enable the other key to go off if it was pressed second
    if (keys.a.pressed && lastKey == 'a')
    {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed && lastKey == 'd')
    {
        player.velocity.x = 5;
    }

    //this if statement enables the bullet to be created upon a w press
    //As well to be shot out by the player
    if (keys.w.pressed)
    {
        bullet.position.x = player.position.x;
        bullet.update();
        bullet.velocity.y = -10;
    }

    if(bullet.position.y < 0)
    {
        bullet.position.y = 475;
        bullet.position.x = 10;
        keys.w.pressed = false;
    }

    if(bottomEnemyY >= upperBulletY && upperEnemyY <= bottomBulletY && leftEnemyX <= rightBulletX && rightEnemyX >= leftBulletX)
    {
        canvasContext.font = "bold 96px Helvetica, Arial, sans-serif";

        canvasContext.fillStyle = "steelblue";
        canvasContext.fillText(record, fillTextOne, fillTextTwo);
    }

    canvasContext.font = "bold 96px Helvetica, Arial, sans-serif";

    canvasContext.fillStyle = "steelblue";
    canvasContext.fillText("", fillTextOne, fillTextTwo);
}

animation();

window.addEventListener('keydown', (event) => 
    {
        //move to the right when pressing the character 'd'
        switch(event.key)
        {
            case 'd' :
                keys.d.pressed = true;
                lastKey = 'd';
                break;
        }

        //move to the left when pressing the character 'a'
        switch(event.key)
        {
            case 'a' :
                keys.a.pressed = true;
                lastKey = 'a';
                break;
        }

        switch(event.key)
        {
            case 'w':
                keys.w.pressed = true;
                break;
        }
    }
)


window.addEventListener('keyup', (event) => 
    {
        
        //stop moving to the right when not pressing the character 'd'
        switch(event.key)
        {
            case 'd' :
                keys.d.pressed = false;
                break;
        }

        //stop moving to the left when not pressing the character 'a'
        switch(event.key)
        {
            case 'a' :
                keys.a.pressed = false;
                break;
        }
    }
)