let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let board;
let context;

let vehicleX = blockSize * 5;
let vehicleY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0;  //speed of vehicle in x coordinate.
let speedY = 0;  //speed of vehicle in Y coordinate.

let vehicleBody = [];

let personX;
let personY;

let gameOver = false;

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placePerson();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set vehicle speed
    setInterval(update, 10000 / 100);
}

function update() {
    if (gameOver) {
        return;
    }

    // Background of a Game
    context.fillStyle = "#353f52";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "#f4a100";
    context.fillRect(personX, personY, blockSize, blockSize);

    if (vehicleX == personX && vehicleY == personY) {
        vehicleBody.push([personX, personY]);
        placePerson();
    }

    // body of vehicle will grow
    for (let i = vehicleBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        vehicleBody[i] = snakeBody[i - 1];
    }
    if (vehicleBody.length) {
        vehicleBody[0] = [vehicleX, vehicleY];
    }

    context.fillStyle = "white";
    vehicleX += speedX * blockSize; //updating Snake position in X coordinate.
    vehicleY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(vehicleX, vehicleY, blockSize, blockSize);
    for (let i = 0; i < vehicleBody.length; i++) {
        context.fillRect(vehicleBody[i][0], vehicleBody[i][1], blockSize, blockSize);
    }

    if (vehicleX < 0 
        || vehicleX > total_col * blockSize 
        || vehicleY < 0 
        || vehicleY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < vehicleBody.length; i++) {
        if (vehicleX == vehicleBody[i][0] && vehicleY == vehicleBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
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
function placePerson() {

    // in x coordinates.
    personX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    personY = Math.floor(Math.random() * total_row) * blockSize; 
}