$(function() {

    //  URL needed to query the database
    var queryURL = "https://opentdb.com/api.php?amount=10&category=12&type=multiple";

    // AJAX call to the opentdb API
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Store all of the retrieved data inside of an object called "response"
        .then(function(results) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(results);
        });
    // Finish setting up at a later date

    $("button").click(function() {
        $("button").hide();
        let timeleft = 10;
        let downloadTimer = setInterval(function() {
            document.getElementById("timer").innerHTML = "Time Remaining: " + timeleft + " Seconds";
            timeleft -= 1;
            //Add trivia questions from API
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("timer").innerHTML = "Time's up!";
                document.getElementById("wins").innerHTML = "Correct Answers: " + wins;
                document.getElementById("losses").innerHTML = "Incorrect Answers: " + losses;
                document.getElementById("skipped").innerHTML = "Unanswered: " + skipped;
            }
        }, 1000);
    });
    //Figure out Timeout later
    /* function startTimer() {
        $("timer").text("Time Remaining: " + timeleft + " Seconds");
        timeleft -= 1;
        timer = setTimeout(function() {
            $(".status").text("Time is up!");
            clearTimeout(timer);
        }, 1000);
    } */

});