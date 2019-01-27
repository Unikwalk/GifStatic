
//Create a variable called animals and save the names of animals in it

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

    var animals = ["penguine", "elephant", "dog", "cat", "fox", "monkey", "chicken", "polar bear", "giraffe", "pig"]

    function makeButton() {
        $("#animals").empty();// Delete the animal buttons prior to adding new animal buttons
        for (var i = 0; i < animals.length; i++) {
            var button = $("<button>");//Make button for each animal in the array.
            button.addClass("animalBtn");// **Important: Add a class          
            button.attr("data-name", animals[i]);// Adding a data-attribute with a value of the animal at index i       
            button.text(animals[i].toUpperCase());// Add the name of animal to button         
            $("#animals").append(button);// Add the button to the HTML
        }   
        //console.log(button.attr("data-name"));    
    }
    
    makeButton();

    $("#add-animal").on("click", function(event) {
        event.preventDefault();// event.preventDefault() prevents the form from trying to submit itself. We're using a form so that the user can hit enter instead of clicking the button if they want       
        var animal = $("#animal-input").val().trim(); // This line will grab the text from the input box        
        animals.push(animal); // The animal from the textbox is then added to the array
        //console.log(animals);     
        makeButton(); //calling makeButton to process animal array
    });

    $(document).on("click",".animalBtn", function() { 
        //Need to target the entire $(document) so when a new button is 
        //added, this event handler can pull in the ajax for the new button.
        //Specifically target the animalBtn class since there are 2 types of button on this page
        var animal = $(this).attr("data-name");
        //console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=EscvvBSpTtzfDzO7xsKeaxwZInw0dyvP&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }) 
        .then(function(response) {
            //console.log(response);
            var results = response.data; 
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>").attr("class", "col-sm-4");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animalImage = $("<img>").attr({
                                                        class: "gif",
                                                        'data-state': "still",
                                                        'data-animate': results[i].images.fixed_height.url,
                                                        'data-still':results[i].images.fixed_height_still.url,
                                                        'src': results[i].images.fixed_height_still.url
                                                        });           
                    
                    gifDiv.append(animalImage);
                    gifDiv.append(p);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            } 
        });
    });

    $(document).on("click",".gif", function() {
                
        var state = $(this).attr("data-state");
        //console.log(state);
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


   

       