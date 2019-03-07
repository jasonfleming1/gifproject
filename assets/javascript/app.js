$(document).ready(function () {

    //make an array of defaults
    var movies = ["eric andre", "strange brew", "pee wee herman", "keanu", "andre the giant", "david hasslehoff", "cheech and chong", "scooby", "darth vader"];
    console.log(movies);
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

    //function to push user keyword into array
    function newButton() {
        $("#btnMovie").on("click", function () {
            event.preventDefault()
            var userMovie = $("#txtMovie").val().trim();
            movies.push(userMovie);
            getButtons();
        });
    }

    //api call function
    function getGifs() {
        var searchValue = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchValue + "&api_key=3hZSWMaSjJSWno43Pmp7OILkjlhl4wmX&limit=10"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {

                $("#showGif").empty();

                var results = response.data;
                if (results == "") {
                    alert("Nothing to see here...try again!")
                }
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    gifDiv.addClass("card");
                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.addClass("image");
                    image.addClass("card-img-top");
                    gifDiv.append(image);

                    var rating = $("<p>").text("Rating: " + results[i].rating);
                    rating.addClass("card-text");
                    gifDiv.append(rating);

                    $("#showGif").prepend(gifDiv);
                }

            })
    }

    //here we are calling the functions
    getButtons();
    newButton();

    //click to get the gifs
    $(document).on("click", ".addMovie", getGifs);

    //click to animate the gifs
    $(document).on("click", ".image", function() {
        var currentState = $(this).attr('data-state');
        if (currentState == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })
});