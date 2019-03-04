$(document).ready(function() {

//make an array of defaults
    var movies = ["terminator", "strange brew", "die hard", "pee wee herman", "star wars"];
    
    //Function to display array as buttons
    function getButtons() {
        $("#buttonSpace").empty();
        for (var i = 0; i < movies.length; i++) {
            var movieButton = $("<button>");
            movieButton.addClass("addMovie");
            movieButton.addClass("btn btn-primary");
            movieButton.attr("data-name", movies[i]);
            movieButton.text(movies[i]);
            $("#buttonSpace").append(movieButton);
        }
    }
    getButtons();

    //function to push user keyword into array

    //Function to display gifs




});