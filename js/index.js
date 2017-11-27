// function to Show All Streams; Online & Offline.
function showAll() {
    console.log("Show all button clicked...")
     $("#card0").show();
     $("#card1").show();
     $("#card2").show();    
     $("#card3").show();
     $("#card4").show();
     $("#card5").show();
}

// function to Show All Online Streams.
function showOnline() {
    console.log("Show Online button clicked...")        
    var listItems = $("#online li");
    var listOnline = "";
    var listOffline = "";
    listItems.each(function() {
        console.log("List of online ids: " + this.textContent);
        listOnline = this.textContent;
        $(listOnline).show();
    });    
    
    var listItems = $("#offline li");
    listItems.each(function() {
        console.log("List of offline ids: " + this.textContent);
        listOffline = this.textContent;
        $(listOffline).hide();
    });        
}

// function to Show All Offline Streams.
function showOffline() {
    console.log("Show Offline button clicked...")    
    var listItems = $("#online li");
    var listOnline = "";
    var listOffline = "";
    listItems.each(function() {
        console.log("List of online ids: " + this.textContent);
        listOnline = this.textContent;
        $(listOnline).hide();
    });    
    
    var listItems = $("#offline li");
    listItems.each(function() {
        console.log("List of offline ids: " + this.textContent);
        listOffline = this.textContent;
        $(listOffline).show();
    });    
}

// function to build our dynamic URL.
function buildURL(arrStreams) {
    var arrURL = []; // = new Array() to store an array of URLs;    
    var bindURL = "https://wind-bow.glitch.me/twitch-api/streams/";
    console.log("Inside our buildURL method...");
    console.log(arrStreams);
    for(var i = 0; i < arrStreams.length; i++) {
        arrURL.push(bindURL + arrStreams[i]);
        // call fetchStreamData with the url string.
        fetchStreamData(arrURL[i], arrStreams[i], i);
        console.log("Binding URL is: " + arrURL[i]);
    }    
    console.log(arrURL);
}

// function for truncating strings and append with ellipsis.
String.prototype.trunc = 
      function(n){
          return this.substr(0,n-1)+(this.length>n?'...':'');
      };

// function to fetch the JSON data.
function fetchStreamData(bindURL, arrStreams, counter) {
    var html = "";
    var linkHtml = "";    
    
    $.ajax({
        url: bindURL,
        dataType: 'jsonp',
        type: 'POST',
        success: function displayResponse(response) {
            var arrOnlineIds = [];
            console.log("Retrieving API data...");
            console.log("Our binding URL is: " + bindURL);                   
            console.log("Our stream value is: " + response.stream);          
            // write out the stream name to each of the cards on the card-deck.
            $("#streamTitle" + counter).text(arrStreams);
            if(response.stream === null && typeof response.stream === "object") {                    
                console.log(linkHtml);
                $("#streamLink" + counter).text("Offline");
                $("#link" + counter).bind('click', false);
                // store all the offline card-ids into a <ul> list "offline"
                var ul = document.getElementById("offline");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode('#card' + counter));
                ul.appendChild(li);                
            } else {
                $("#streamLink" + counter).text("Online");
                $("#cardtext" + counter).text((response.stream.channel.status).trunc(28)); 
                $("#cardtext" + counter).append("<br>Last Updated: " + (response.stream.channel.updated_at).trunc(11));               
                $("#imageID" + counter).attr('src', response.stream.channel.logo);
                $("#link" + counter).attr('href', response.stream.channel.url);
                $("#featured").text(arrStreams + " : " + response.stream.channel.status);
                $("#lastupd").text("Last Updated" + ": " + (response.stream.channel.updated_at).trunc(11));
                $("#btnViewProfile").attr('href', response.stream.channel.url);           
                // store all the online card-ids into a <ul> list "online"
                var ul = document.getElementById("online");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode('#card' + counter));
                ul.appendChild(li);
                
            }                            
        }               
    })
    
    function setHeader(xhr) {
        xhr.setRequestHeader("Origin", "yattish@gmail.com");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
    };    
    
}

function getTwitchStream() {
    var arrStreams = ['RobotCaleb','freecodecamp','esl_sc2', 'jimlee', 'Sick_Nerd', 'P00se2'];
    var strTestStream = "freecodecamp";

    // make a call to our buildURL function.
    buildURL(arrStreams);
}