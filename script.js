$(document).ready(function(){
    // A list of words to draw from
    var words = ['money','unity','gameplay',"innovation",'backpack','sourdough']

    // Choose a random word from the array
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters=[]
    var remainingGuesses = 6

    
    for(var i=0;i<chosenWord.length;i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    function updateGuesses(){
        $('#guess-container').empty()
        $('#guess-container').text("Guessed letters: " + guessedLetters.join(', '))
    }

    function checkGuess(Letter){

        if(chosenWord.indexOf(Letter) === -1){
            remainingGuesses--
            $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
        }else {
            // Reveal the guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord[index] === Letter){
                    $(this).text(Letter)
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    function checkGameStatus() {
        var hiddenLetters = $('.hidden-letter:contains("_")');
        if (hiddenLetters.length === 0) {
            // Reveal the last hidden letter before displaying the winning message
            $('.hidden-letter').each(function(index) {
                if ($(this).text() === "_") {
                    $(this).text(chosenWord[index]);
                }
            });
            alert('You won!');
            resetGame();
        } else if (remainingGuesses === 0) {
            alert("You're bad at the game, the word was: " + chosenWord);
            resetGame();
        }
    }
    
    
    
    function resetGame(){
        guessedLetters = []
        remainingGuesses = 6
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random()*words.length)]
        for(var i=0;i<chosenWord.length;i++){
            $('#word-container').append('<div class="hidden-letter">_</div>')
        }
        updateGuesses()
    }

    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase()
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter)
            checkGuess(letter)
        }
    })
})