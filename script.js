$(document).ready(function(){
    var words = ['money', 'unity', 'gameplay', 'innovation', 'backpack', 'sourdough'];
    $('.progress-bar').css('width', '0%');

    // ASCII Art for Hangman in different stages
    var hangmanArt = [
        "  +---+\n" +
        "  |   |\n" +
        "      |\n" +
        "      |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
    
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        "      |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
    
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        "  |   |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
    
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|   |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
    
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|\\  |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
    
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|\\  |\n" +
        " /    |\n" +
        "      |\n" +
        "=========",
    
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|\\  |\n" +
        " / \\  |\n" +
        "      |\n" +
        "========="
    ];
    

    var chosenWord = words[Math.floor(Math.random() * words.length)];
    var guessedLetters = [];
    var remainingGuesses = 6;
    var hangmanStage = 0; // Initial stage of the hangman

    function updateProgress() {
        var totalLetters = $('.hidden-letter').length;
        var discoveredLetters = totalLetters - $('.hidden-letter:contains("_")').length;
        var progressPercentage = (discoveredLetters / totalLetters) * 100;
        var guessedLettersWidth = $('#guess-container').width();
    }

    for(var i=0; i<chosenWord.length; i++){
        $('#word-container').append('<div class="hidden-letter">_</div>');
    }

    function updateGuesses(){
        $('#guess-container').empty();
        $('#guess-container').text("Guessed letters: " + guessedLetters.join(', '));
    }

    function checkGuess(letter){
        if(chosenWord.indexOf(letter) === -1){
            remainingGuesses--;
            hangmanStage++;
            updateHangman(); // Update hangman display on wrong guess
            $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses);
        } else {
            // Reveal the guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord[index] === letter){
                    $(this).text(letter);
                }
            });
        }
        updateGuesses();
        checkGameStatus();
    }

    function checkGameStatus() {
        var hiddenLetters = $('.hidden-letter:contains("_")');
        var totalLetters = $('.hidden-letter').length;
        var discoveredLetters = totalLetters - hiddenLetters.length;
        var progressPercentage = (discoveredLetters / totalLetters) * 100;
    
        $('.progress-bar').css('width', progressPercentage + '%');
    
        if (hiddenLetters.length === 0) {
            // Reveal the last hidden letter before displaying the winning message
            $('.hidden-letter').each(function(index) {
                if ($(this).text() === "_") {
                    $(this).text(chosenWord[index]);
                }
            });
            alert('You won!');
             // Set progress bar to full
            resetGame();
        } else if (remainingGuesses === 0) {
            alert("You're bad at the game, the word was: " + chosenWord);
            resetGame();
        }
    }

    function resetGame(){
        guessedLetters = [];
        remainingGuesses = 6;
        hangmanStage = 0; // Reset hangman stage
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
        $('#word-container').empty();
        chosenWord = words[Math.floor(Math.random() * words.length)];
        for(var i=0; i<chosenWord.length; i++){
            $('#word-container').append('<div class="hidden-letter">_</div>');
        }
        updateGuesses();
        updateHangman(); // Update hangman display on game reset
    }

    function updateHangman() {
        $('#hangman-container').html(hangmanArt[hangmanStage]);
    }

    updateHangman(); // Initial display of hangman

    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase();
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    });
});
