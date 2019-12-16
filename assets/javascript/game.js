$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
})
  
let trivia = {
    // music trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    // questions options and answers data
    questions: {
        q1: "Who wrote the Sinead O`Connor hit 'Nothing Compares 2 U'?",
        q2: 'Which of these songs was released in 1996?',
        q3: 'Pink Floyd made this song for their previous lead singer Syd Barrett.',
        q4: 'Which country does the power metal band "Sabaton" originate from?',
        q5: 'Which of these is the name of a song by Tears for Fears?',
        q6: 'Which of these bands is the oldest?',
        q7: "Which company did the animation for Peter Gabriel's Video Sledgehammer (1986)?",
        q8: 'Which rapper had an album that went double platinum with no features?',
        q9: "What is rapper Drake's real name?",
        q10: 'What is the stage name of New Zealand singer Phillipa "Pip" Brown?'
        },
    options: {
        q1: ["Michael Jackson", "Prince", "Cameo", "Rick James"],
        q2: ["James Blunt - '1973'", "David Bowie - '1984'", "Prince - '1999'", "The Smashing Pumpkins - '1979'"],
        q3: ["Have A Cigar", "Welcome to the Machine", "Wish You Were Here", "Shine On You Crazy Diamond"],
        q4: ["Finland", "United States", "Sweden", "Germany"],
        q5: ["Yell", "Shout", "Scream", "Shriek"],
        q6: ["AC/DC", "Metallica", "Pink Floyd", "Red Hot Chili Peppers"],
        q7: ["HIT Entertainment", "Illumination Entertainment", "VIZ Media", "Aardman Animations"],
        q8: ["Drake", "Kendrick Lamar", "J. Cole", "Big Sean"],
        q9: ["Dwayne Carter", "Shaun Carter", "Aubrey Graham", "Andre Young"] ,
        q10:["Ladyhawke", "Lorde", "Kesha", "Anika Moa"] 
    },
    answers: {
        q1: 'Prince',
        q2: 'The Smashing Pumpkins - "1979"',
        q3: 'Shine On You Crazy Diamond',
        q4: 'Sweden',
        q5: 'Shout',
        q6: 'Pink Floyd',
        q7: 'Aardman Animations',
        q8: 'J. Cole',
        q9: 'Aubrey Graham',
        q10: 'Ladyhawke'
    },

    // music trivia methods
    // start game
    startGame: function() {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game 
        $('#game').show();

        //  clear
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question
        trivia.nextQuestion();
    },
    nextQuestion: function () {
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        let questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        let questionOptions = Object.values(trivia.options)[trivia.currentSet];

        // creates all the trivia guess options in the html
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option buttonCSS btnOptions">' + key + '</button>'));
        })
    },
    //timer function
    timerRunning: function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 2) {
                $('#timer').addClass('last-seconds');
            }
        }
        // time runs out - result
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('.option').remove();
            $('#results').html("<h3>Time's Up! Better luck next time...</h3>");
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results')
                .html(
                    '<h4>Correct: ' + trivia.correct + '</h4>' +
                    '<h4>Incorrect: ' + trivia.incorrect + '</h4>' +
                    '<h4>Unaswered: ' + trivia.unanswered + '</h4>'
                );

            // hide game section
            $('#game').hide();

            // show start button for a new game
            $('#start').show();
        }
    },
    // method to evaluate the option clicked
    guessChecker:function () {

        // timer ID
        let resultId;

        // answer for current question
        let currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        // increment correct
        if ($(this).text() === currentAnswer) {
            // green for correct
            $(this).addClass('btn-success').removeClass('buttonCSS');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('.option').remove();
            $('#results').html('<h3>Correct!</h3>');
        }
        // else the user picked the wrong option, incorrect
        else {
            // turn button clicked red for incorrect
            $(this).addClass('btn-danger').removeClass('buttonCSS');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('.option').remove();
            $('#results').html('<h3>Better luck next time!</h3>');
        }
    },
    guessResult:function () {
        // next question set
        trivia.currentSet++;

        // clear the options and results
        $('.option').remove();
        $('#results h3').remove();

        // next question
        trivia.nextQuestion();
    }
}
