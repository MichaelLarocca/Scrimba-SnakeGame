const gameGrid = document.getElementById("grid-game");
const startButton = document.getElementById("btn-start");
const scoreBoard = document.getElementById("score-board");
const scoreBoardHigh = document.getElementById("score-board-high");
const gameOver = document.getElementById("game-over");
const btnStart = document.getElementById("btn-start");
const joystickUp = document.getElementById("joystick-up");
const joystickDown = document.getElementById("joystick-down");
const joystickLeft = document.getElementById("joystick-left");
const joystickRight = document.getElementById("joystick-right");
const joystickStart = document.getElementById("control-board-button-1");
const joystickPause = document.getElementById("control-board-button-pause");
let score = 0;
let highScore = 0;
let gameSquares = [];
let currentSnake = [2,1,0];
let direction = 1;
let currentDirection = 1;
const gameGridWidth = 10;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGameBoard() {
  for(let i = 0; i < 100; i++) {
    const gameSquare = document.createElement("div");
    gameSquare.classList.add("square");
    gameGrid.appendChild(gameSquare);
    gameSquares.push(gameSquare);
  }
}
createGameBoard();

currentSnake.forEach(index => gameSquares[index].classList.add("snake"));

gameSquares[2].classList.add("snake-head")

function startGame() {

  for(let i = 0; i < 100; i++) {
    gameSquares[i].classList.remove("snake-head");
  } 
  
  currentDirection = 1;
  
  highScore < score ? highScore = score : highScore = highScore;

  scoreBoardHigh.textContent = `High Score: ${highScore}`;
  
  gameOver.style.display = "none";
  btnStart.style.bottom = "15px";

  currentSnake.forEach(index => gameSquares[index].classList.remove('snake'))

  gameSquares[appleIndex].classList.remove('apple')
  clearInterval(timerId)
  currentSnake = [2,1,0]
  score = 0

  scoreBoard.textContent = `Score: ${score}`;
  direction = 1
  intervalTime = 1000
  generateApples()

  currentSnake.forEach(index => gameSquares[index].classList.add('snake'))
  gameSquares[2].classList.add("snake-head")
  timerId = setInterval(move, intervalTime)
}

function move() {

  for(let i = 0; i < 100; i++) {
     if(!gameSquares[i].classList.contains("snake")) {
        gameSquares[i].classList.remove('snake-direction-up');
        gameSquares[i].classList.remove('snake-head-up');
        gameSquares[i].classList.remove('snake-direction-down');
        gameSquares[i].classList.remove('snake-head-down');
        gameSquares[i].classList.remove('snake-direction-left');
        gameSquares[i].classList.remove('snake-head-left');
        gameSquares[i].classList.remove('snake-direction-right');
        gameSquares[i].classList.remove('snake-head-right');
       } 
    if(!gameSquares[i].classList.contains("snakesnake-head")) {
      (gameSquares[i].classList.remove("snake-head"));
    }
  }

   if(currentDirection === -gameGridWidth) {
     gameSquares[currentSnake[0]].classList.add("snake-direction-up");
     gameSquares[currentSnake[0]].classList.add("snake-head-up");
   }
    if(currentDirection === +gameGridWidth) {
     gameSquares[currentSnake[0]].classList.add("snake-direction-down");
      gameSquares[currentSnake[0]].classList.add("snake-head-down");
   }
    if(currentDirection === -1) {
     gameSquares[currentSnake[0]].classList.add("snake-direction-left");
     gameSquares[currentSnake[0]].classList.add("snake-head-left");
   }
    if(currentDirection === +1) {
     gameSquares[currentSnake[0]].classList.add("snake-direction-right");
     gameSquares[currentSnake[0]].classList.add("snake-head-right");
   } 

    if (
        (currentSnake[0] + gameGridWidth >= 100 && direction === 10) || //if snake has hit bottom
        (currentSnake[0] % gameGridWidth === 9 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % gameGridWidth === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - gameGridWidth < 0 && direction === -10) ||//if snake has hit top
        gameSquares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        gameOver.style.display = "inline-block";
        btnStart.style.bottom = "98px";
        return clearInterval(timerId);
    }
    
    const tail = currentSnake.pop();
    gameSquares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    gameSquares[currentSnake[0]].classList.add("snake");
    
    if(gameSquares[currentSnake[0]].classList.contains("apple")){
    gameSquares[currentSnake[0]].classList.remove("apple");
    gameSquares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateApples();
    score++;  
    scoreBoard.textContent = `Score: ${score}`;
    clearInterval(timerId);
    intervalTime = intervalTime * speed;  
    timerId = setInterval(move, intervalTime)  
    }
  
    gameSquares[currentSnake[0]].classList.add("snake-head");
}

function control(e) {
  console.log(`currentDirection: ${currentDirection}`);
  
  if(e.keyCode === 39) {
    // console.log(`Right`);
    if(currentDirection !== -1) {
      direction = 1;
      currentDirection = direction;
      joystickRight.style.backgroundColor = "greenyellow";
    }  
  } else if (e.keyCode === 38) {
    if(currentDirection !== gameGridWidth) {
      direction = -gameGridWidth;
      currentDirection = direction;
      joystickUp.style.backgroundColor = "greenyellow";
    }
  } else if (e.keyCode === 37) {
    if(currentDirection !== 1) {
        direction = -1; 
        currentDirection = direction;
        joystickLeft.style.backgroundColor = "greenyellow";
    }

  } else if (e.keyCode === 40) {
    if(currentDirection !== -gameGridWidth) {
        direction = +gameGridWidth;
        currentDirection = direction;
        joystickDown.style.backgroundColor = "greenyellow";
    }
  }
}

document.addEventListener('keydown', control);
document.addEventListener('keyup', (e) => {
  if(e.keyCode === 40) {
  joystickDown.style.backgroundColor = "transparent";
    }
  if(e.keyCode === 39) {
  joystickRight.style.backgroundColor = "transparent";
    }
   if(e.keyCode === 38) {
  joystickUp.style.backgroundColor = "transparent";
    }
   if(e.keyCode === 37) {
  joystickLeft.style.backgroundColor = "transparent";
    }  
});

function generateApples() {
    do {
      appleIndex = Math.floor(Math.random() * gameSquares.length);
    } while (gameSquares[appleIndex].classList.contains('snake'));

    gameSquares[appleIndex].classList.add('apple');
}
generateApples()

startButton.addEventListener('click', startGame);

btnStart.addEventListener('click', ()=> {
  console.log(`onmouseenter`);
  joystickStart.style.backgroundColor = "greenyellow";
  
    setInterval(function(){
    joystickStart.style.backgroundColor = "transparent"; 
  }, 1000);

})

joystickUp.addEventListener('click', ()=>{
    if(currentDirection !== gameGridWidth) {
      direction = -gameGridWidth;
      currentDirection = direction;
      joystickUp.style.backgroundColor = "greenyellow";
      setTimeout(()=>{joystickUp.style.backgroundColor = "transparent"; }, 100);
    }
});
joystickDown.addEventListener('click', ()=>{
    if(currentDirection !== -gameGridWidth) {
      direction = gameGridWidth;
      currentDirection = direction;
      joystickDown.style.backgroundColor = "greenyellow";
      setTimeout(()=>{joystickDown.style.backgroundColor = "transparent"; }, 100);
    }
});
joystickLeft.addEventListener('click', ()=>{
    if(currentDirection !== 1) {
        direction = -1; 
        currentDirection = direction;
        joystickLeft.style.backgroundColor = "greenyellow";
        setTimeout(()=>{joystickLeft.style.backgroundColor = "transparent"; }, 100);
      }  
});
joystickRight.addEventListener('click', ()=>{
    if(currentDirection !== -1) {
        direction = 1; 
        currentDirection = direction;
        joystickRight.style.backgroundColor = "greenyellow";
        setTimeout(()=>{joystickRight.style.backgroundColor = "transparent"; }, 100);
      }  
});

joystickPause.addEventListener('click', pauseGame);

document.addEventListener('keydown', (e) => {
  if(e.keyCode === 80) {
    pauseGame();
  }
});

document.addEventListener('keydown', (e) => {
  if(e.keyCode === 83) {
    startGame();
    joystickStart.style.backgroundColor = "greenyellow";
    setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500);  
  }
});

joystickStart.addEventListener('click', ()=>{
  startGame();
  joystickStart.style.backgroundColor = "greenyellow";
  setTimeout(()=>{joystickStart.style.backgroundColor = "transparent"; }, 500);  
});

function pauseGame(){
  joystickPause.style.backgroundColor = "greenyellow";
  setTimeout(()=>{joystickPause.style.backgroundColor = "transparent"; }, 500);
  setTimeout(()=>{
    alert(`
          GAME PAUSED
    
          Click "OK" or press "Enter" to continue`);
  }, 100)  
}