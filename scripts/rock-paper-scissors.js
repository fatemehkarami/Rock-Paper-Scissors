let score = JSON.parse(localStorage.getItem('score')) || {
  winCount : 0,
  loseCount : 0,
  tieCount : 0,
  result : ''
  };

const autoPlayButtonElement = document.querySelector('.js-auto-play-button');
autoPlayButtonElement.addEventListener('click', () => autoplay());

let autoplaying = false;
let intervalId;

function autoplay(){
  if (!autoplaying) {
    autoplaying = true;
    const userMove = pickComputerMove();
    playGame(userMove);
    intervalId = setInterval(() => playGame(userMove), 1000 );
  } else {
    autoplaying = false;
    clearInterval(intervalId);
  }
}


const rockButtonElement = document.querySelector('.js-rock-button');
rockButtonElement.addEventListener('click', () => playGame('Rock'));

const paperButtonElement = document.querySelector('.js-paper-button');
paperButtonElement.addEventListener('click', () => playGame('Paper'));


const scissorsButtonElement = document.querySelector('.js-scissors-button');
scissorsButtonElement.addEventListener('click', () => playGame('Scissors'));

document.querySelector('body').addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  } 
});


function playGame(userMove){
  const computerMove = pickComputerMove();
  calculateResult(userMove, computerMove);
  showResult(userMove, computerMove, score);
}


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (0<= randomNumber && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (1/3<= randomNumber && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else if (2/3<= randomNumber && randomNumber < 1) {
    computerMove = 'Scissors';
  }   
  return computerMove;  
}
  

function calculateResult(userMove, computerMove) {
  
  if (userMove === 'Rock') {
    if(computerMove === 'Rock') {
      score.result = 'Tie';
    } else if (computerMove === 'Paper') {
      score.result = 'You lose';
    } else if (computerMove === 'Scissors') {
      score.result = 'You win';
    } 
  }
  
  else if (userMove === 'Paper') {
    if(computerMove === 'Rock') {
      score.result = 'You win';
    } else if (computerMove === 'Paper') {
      score.result = 'Tie';
    } else if (computerMove === 'Scissors') {
      score.result = 'You lose';
    } 
  }
    
  else if (userMove === 'Scissors'){
    if(computerMove === 'Rock') {
      score.result = 'You lose';
    } else if (userMove === 'Scissors' && computerMove === 'Paper') {
      score.result = 'You win';
    } else if (userMove === 'Scissors' && computerMove === 'Scissors') {
      score.result = 'Tie';
    }
  }

  if (score.result === 'You lose') {
    score.loseCount +=1;
  } else if (score.result === 'You win') {
    score.winCount +=1;
  } else if (score.result === 'Tie') {
    score.tieCount +=1;
  }

  localStorage.setItem('score',JSON.stringify(score));
}


function showResult(userMove, computerMove, score) {
  document.querySelector('.js-result').innerHTML = `${score.result}.`;

  document.querySelector('.js-moves').innerHTML = `You <img class="move-icon" src="pictures/${userMove}.png"> Computer <img class="move-icon" src="pictures/${computerMove}.png">`
  
  updateScore();
}

function updateScore() {
  document.querySelector('.js-scores').innerHTML = `loses: ${score.loseCount}, wines: ${score.winCount}, ties: ${score.tieCount}`;
}

const resetButtonElement = document.querySelector('.js-reset-button');
resetButtonElement.addEventListener('click', () => resetScore());

function resetScore(){
  score = {
    winCount : 0,
    loseCount : 0,
    tieCount : 0,
    result : ''
  };

  localStorage.setItem ('score', JSON.stringify(score));

  updateScore();
}
