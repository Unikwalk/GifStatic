
//Create a variable called topics and save the names of animals in it

//Functions:
    //for-loop:
        //Create button for each name (run a loop and append button to a div)
    //RenderButton:
        //Add a form to page takes the value from a user input box and adds it into your topics array.
        //Then make a function call that takes each topic in the array remakes the buttons on the page.
    //On-click function: 
        //Set API's limit to 10 (grab only 10 images) and append to the html
        //Grab rating from each image and display underneath
    //On-click function:
        //Use pausing-gifs codes to create still image and animated gif on click

    animals = ["penguine", "elephant", "dog", "cat", "fox", "monkey", "chicken", "polar bear", "giraffe", "pig"]

    function makeButton() {
        $("#animals").empty();// Delete the animal buttons prior to adding new animal buttons
        for (var i = 0; i < animals.length; i++) {// Looping through the array of animals
            var button = $("<button>");//Make button for each animal in the array.
            button.addClass("animal");// Add a class          
            button.attr("data-name", animals[i]);// Adding a data-attribute with a value of the animal at index i       
            button.text(animals[i].toUpperCase());// Add the name of animal to button         
            $("#animals").append(button);// Add the button to the HTML
        }       
    }
    
    makeButton();

    $("#add-animal").on("click", function(event) { // This function handles events where one button is clicked
        event.preventDefault();// event.preventDefault() prevents the form from trying to submit itself. We're using a form so that the user can hit enter instead of clicking the button if they want       
        var animal = $("#animal-input").val().trim(); // This line will grab the text from the input box        
        animals.push(animal); // The animal from the textbox is then added to our array        
        makeButton(); //calling makeButton to process animal array
    });

    $("button").on("click", function() {
        var animal = $(this).attr("data-name");
        //console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=EscvvBSpTtzfDzO7xsKeaxwZInw0dyvP&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }) 
        .then(function(response) {// After the data comes back from the API
            console.log(response);
            var results = response.data; //Storing an array of results in the results variable
            for (var i = 0; i < results.length; i++) {// Looping over every result item
                if (results[i].rating !== "r" && results[i].rating !== "pg-13" && results[i].rating !== "pg") {
                    var gifDiv = $("<div>").attr("class", "col-sm-4");// Creating a div for the gif
                    var rating = results[i].rating;// Storing the result item's rating
                    var p = $("<p>").text("Rating: " + rating);// Creating a paragraph tag with the result item's rating
                    var animalImage = $("<img>").attr({// Creating an image tag, add attributes
                                                        class: "gif",
                                                        'data-state': "still",
                                                        'data-animate': results[i].images.fixed_height.url,
                                                        'data-still':results[i].images.fixed_height_still.url,
                                                        'src': results[i].images.fixed_height_still.url
                                                        });           
                    gifDiv.append(p);
                    gifDiv.append(animalImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                    
                    $("img").on("click", function() {
                
                        var state = $(this).attr("data-state");
                        console.log(state);
                        if (state === "still") {
                            $(this).attr("src", $(this).attr('data-animate'));
                            $(this).attr("data-state", "animate");
                        //console.log($(this).attr("src"))
                        } 
                        else {
                            $(this).attr("src", $(this).attr('data-still'));
                            $(this).attr("data-state", "still");
                        }
                    });
                }
            } 
        });
    });


   

       