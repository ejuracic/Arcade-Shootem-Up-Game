const canvas = document.querySelector('canvas'); //getting a const variable to be assigned to canvas for resizing
const canvasContext = canvas.getContext('2d'); //making the canvas know that this is gonna be a 2D game

canvas.width = 1024; //width of the canvas is gonna be 1024 pixels
canvas.height = 576; //height of the canvas is gonna be 576 pixels

canvasContext.fillRect(0,0, canvas.width, canvas.height); //filling the canvas so we can see it appear on the website

//class to contain elements and variables that make up a "sprite"
class Sprite
{
    //defining properties that make up a sprite
    //position and velocity are wrapped together as one arguement so either one is needed but not required
    constructor({position, velocity})
    {
        this.position = position;
        this.velocity = velocity
    }

    //defining how the sprite will look like
    draw()
    {
        canvasContext.fillStyle = 'red' //colouring the sprite
        canvasContext.fillRect(this.position.x, this.position.y, 50, 150); //setting the position of the sprite
    }

    //this method moves the sprites
    update()
    {
        this.draw();
        this.position.x += this.velocity.x;
    }
}

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
        }
    });

//instantiating an enemy of the sprite class
const enemy = new Sprite(
    {
        position:
        {
            x:500, 
            y:0
        },
        velocity:
        {
            x:0,
            y:0
        }
    }
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

    player.velocity.x = 0;
    //these if statements enable the other key to go off if it was pressed second
    if (keys.a.pressed && lastKey == 'a')
    {
        player.velocity.x = -1;
    }
    else if (keys.d.pressed && lastKey == 'd')
    {
        player.velocity.x = 1;
    }
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