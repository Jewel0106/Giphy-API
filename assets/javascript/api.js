
var topics = ["Angry", "Bored", "Drunk", "Embarrassed", 
                "Hungry", "Nervous", "Sad", "Sassy", "Shocked"];

var gifImage;

    function displayTopicInfo() {

          $("#emotions").empty();

        var giphy = $(this).attr("data-name");
        console.log("You clicked: " + giphy);
        //giphy api url - grab 10 static, non-animated gif images
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&rating=&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var results = response.data;
          
          for (var i = 0; i < results.length; i++){
            console.log(response.data[i].rating);
            console.log(response.data[i].images.fixed_height.url);
          
          var gifDiv = $("<div class='emotionsTopics'>");

              var gifRating = results[i].rating;

              var rating = $("<p>").text("Rating: " + gifRating);

              gifImage = $("<img>");

              gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-state", "still");

              gifImage.attr("data-still", results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", results[i].images.fixed_height.url);

              gifImage.addClass("gif");
              
              gifDiv.prepend(rating);
              gifDiv.prepend(gifImage); 

            $("#emotions").prepend(gifDiv);

          }
      });
}

    function animate(){
      
              var state = $(this).attr("data-state");

                  if (state === "still"){
                   $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                  }
                  if (state === "animate"){
                   $(this).attr("src", $(this).attr("data-still"));
                   $(this).attr("data-state", "still");
                  }
     }

       
      function renderButtons() {

        // Keeps button form repeating
        $("#buttons-container").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          var button = $("<button>");
          // Adding a class of movie to our button
          button.addClass("emotionButton");
          // Adding a data-attribute
          button.attr("data-name", topics[i]);
          // Providing the initial button text
          button.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-container").append(button);
        }
      }

      // This function handles events where a movie button is clicked
      $("#submitButton").on("click", function(event) {
        
          event.preventDefault();

          var newEmotion = $("#emotions-input").val().trim();

          if(newEmotion !== ""){

            topics.push(newEmotion);

            renderButtons();

            $("#emotions-input").val("");
          }
      });

      // Adding a click event listener to all elements with a class of "emotionButton" 

      $(document).on("click", ".emotionButton", displayTopicInfo);

      $(document).on("click", ".gif", animate);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      
                


