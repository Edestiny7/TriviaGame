$(function () {

    const wins = 0;
    const losses = 0;
    const skipped = 0;


    //  URL needed to query the database
    const queryURL = "https://opentdb.com/api.php?amount=10&category=12&type=boolean";

    function displayTrivia() {
        // AJAX call to the opentdb API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // Store all of the retrieved data inside of an object called "response"
            .then(function (results) {

                const response = results;
                $("#trivia-view").empty();
                // Log the queryURL
                console.log(response.results);

                for (let index in response.results) {
                    let trivia = response.results[index];
                    let question = trivia.question;
                    let incorrectAnswers = trivia.incorrect_answers;
                    let correctAnswer = trivia.correct_answer;
                    let answers = [];
                    incorrectAnswers.push(correctAnswer);
                    answers = incorrectAnswers;
                    answers.sort(() => 0.5 - Math.random());
                    console.log("Question: " + question);
                    console.log("OptionA: ", answers[0]);
                    console.log("OptionB: ", answers[1]);

                    // Div to hold each question and answer section
                    let questionDiv = $("<div class='question'>");

                    // Create question element
                    let pQuestion = $("<p>").html(question);

                    // Create possible answer element
                    /*                     let bOptionT = $("<button class='optionT'>").html("TRUE");
                                        let bOptionF = $("<button class='optionF'>").html("FALSE"); */

                    /*                     let bOptionT = $("<button id='buttonCSS' name='group1' data-value='true'>True</button>");
                                        let bOptionF = $("<button id='buttonCSS' name='group1' data-value='false'>False</button>"); */

                    let bOptionT = $('<input id="Radio1" type="radio" class="radio" name="group1" data-value="true" >true</input>');
                    let bOptionF = $('<input id="Radio2" type="radio" class="radio" name="group1" data-value="false">false</input>');



                    // Display question element
                    questionDiv.append(pQuestion);

                    // Display possible answer element
                    questionDiv.append(bOptionT);
                    questionDiv.append(bOptionF);

                    // Display in HTML
                    $("#trivia-view").append(questionDiv);


                }
                /*                 $(".radio").click(function () {
                                    alert($("input:radio[name='group1']:checked").attr("data-value"));
                
                
                                }); */
            });
    }

    $("button").click(function () {
        $("button").hide();
        let timeleft = 180;
        let downloadTimer = setInterval(function () {
            document.getElementById("timer").innerHTML = "Time Remaining: " + timeleft + " Seconds";
            timeleft -= 1;
            if (timeleft <= 0) {
                $("#trivia-view").hide();
                clearInterval(downloadTimer);
                document.getElementById("timer").innerHTML = "Time's up!";
                document.getElementById("wins").innerHTML = "Correct Answers: " + wins;
                document.getElementById("losses").innerHTML = "Incorrect Answers: " + losses;
                document.getElementById("skipped").innerHTML = "Unanswered: " + skipped;
            }
        }, 1000);
        displayTrivia();
    });
});
