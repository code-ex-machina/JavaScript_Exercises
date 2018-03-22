// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Play again even listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'yellow');
  }

  // Check if won
  if(guess === winningNum) {
    // Game over - won

    gameOver(true, `${winningNum} is correct! YOU WIN`)

  } else {
    // Wrong number 
    guessesLeft -= 1;

    if(guessesLeft <= 0){
      // Game over - lost
      
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - awnser wrong

      // Change color
      guessInput.style.backgroundColor = 'yellow';
      guessInput.style.borderColor = 'yellow';
      guessInput.style.color = 'black';

      // Clear input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses Left`, 'yellow');
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

   // Disable input
   guessInput.disabled = true;
   // Change border color
   guessInput.style.backgroundColor = color;
   guessInput.style.borderColor = color;
   guessInput.style.color = 'white';
   message.style.color = color;
   // Set message
   let mes = setMessage();
   setMessage(msg);

   // Play again
   guessBtn.value = 'Play Again';
   guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}