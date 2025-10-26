let blockSize = 40;
let total_row = 10; //total row number
let total_col = 10; //total column number
let board;
let board2;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let score = 0;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    setInterval(update, 1000 / 5);
}

var train_conductor_image = new Image();
train_conductor_image.src = 'images/train_conductor.png';

var train_carriage_image = new Image();
train_carriage_image.src = 'images/train_carriage.png';

var small_person_image = new Image();
small_person_image.src = 'images/person.png';

// var people_image = new Image(1,1);
// people_image.src = 'images/people.png';

function update() {
    if (gameOver) {
        return;
    }

    // Background of a Game
    context.fillStyle = "gray";
    context.fillRect(0, 0, board.width, board.height);

    
    // Set food color and position
    //context.fillStyle = "yellow";
    context.drawImage(small_person_image, foodX, foodY, blockSize, blockSize);

    // context.drawImage(small_person_image, foodX, foodY);    
    
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        // context.drawImage(train_carriage_image, snakeX, snakeY);
        snakeBody[i] = snakeBody[i-1];
    }


    // for (let i = 0; i <= snakeBody.length; i++) {
    //     snakeBody[i] = snakeBody[i+1] 
    // }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
        
        
    }
    
    drawScore();

    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.drawImage(train_conductor_image, snakeX, snakeY, blockSize-10, blockSize-10);
    for (let i = 0; i < snakeBody.length; i++) {
        context.drawImage(train_carriage_image, snakeBody[i][0], snakeBody[i][1], blockSize-10, blockSize-10);
    }

    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        alert("Game Over");
        location.reload();

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
            location.reload();
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize; 

    context.drawImage(small_person_image, foodX, foodY, blockSize, blockSize);

}

function drawScore(){
    context.font = "16px Arial";
    context.fillStyle = "black";
    context.fillText(`Score: ${score}`, 8, 20);
}

