const canvas = document.querySelector('canvas'); //getting a const variable to be assigned to canvas for resizing
const canvasContext = canvas.getContext('2d'); //making the canvas know that this is gonna be a 2D game

canvas.width = 1024; //width of the canvas is gonna be 1024 pixels
canvas.height = 576; //height of the canvas is gonna be 576 pixels

canvasContext.fillRect(0,0, canvas.width, canvas.height); //filling the canvas so we can see it appear on the website

//class to contain elements and variables that make up a "sprite"
class Sprite
{
    //defining properties that make up a sprite
    constructor(position, velocity)
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
}

const player = new Sprite({x:0, y:0}); //instantiating a player of the sprite class
const enemy = new Sprite({x:500, y:100}); //instantiating an enemy of the sprite class

player.draw(); //adding the player to the canvas
enemy.draw(); //adding the enemy to the canvas

//infinite loop to continously animate
function animation()
{
    window.requestAnimationFrame(animation);
}

animation();