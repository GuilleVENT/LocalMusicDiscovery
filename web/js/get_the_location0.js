﻿//  <div id="mapholder"></div>
//  <p id="city"></p>


//To start the whole Service. The Output is in the town_output function and can be used there inside because its asynchronity. The parameter is valid between 1:9, so 9 TownsNearby can be adressed. Like here with Parameter=0  the closesd town comes out of the town_output function.
getLocation(0);


//Place HERE INSIDE THE town_output Function Your CODE TO BE RUN WITH THE town. Here inside you can work with the object "town"      Mabe you can also use the function town_output() as a input argument in your function
function town_output(town) {
    //to show it works
    document.getElementById("city").innerHTML = town;


}





//Get the Position from your browser. If you dont have wlan=on and its not a mobile device, the position is those of the main routing point 
function getLocation(number_of_town) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            showPosition(position);
            //here the argument parse_function will be also the callback function
            loadFile(position, parse_function, number_of_town);
        });
    } else {
        document.getElementById("city").innerHTML = "Geolocation is not supported by this browser.";
    }

}

//Runns in case of success of loading NearbyPlaceNames from http.  It then runns the callback
function xhrSuccess() { this.callback.apply(this, this.arguments); }

//Runns in case of error in loading NearbyPlaceNames from http
function xhrError() { console.error(this.statusText); }

//The main function for loading NearbyPlaceNames
function loadFile(position, fCallback, number_of_town) {
    var oReq = new XMLHttpRequest();
    oReq.number_of_town = number_of_town;
    oReq.callback = fCallback;
    oReq.arguments = Array.prototype.slice.call(arguments, 3);
    oReq.onload = xhrSuccess;
    oReq.onerror = xhrError;
    var url = genUrlPos(position);
    oReq.open("get", url, true);
    oReq.send(null);
}

//generates the url from the position. cities=cities15000 says that only citys with more than 15000People are shown.
function genUrlPos(position) {
    var latit = position.coords.latitude;
    var longit = position.coords.longitude;
    var url = "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + latit + "&lng=" + longit + "&radius=50&cities=cities15000&lang=local&username=LocalMusicDiscovery";
    return url;
}

//Runns as last function before town_output. Input is the the callback function. If the town_number exceeds the list, one town nearby is picked randomly
function parse_function() {
    NearbyPlaces = JSON.parse(this.responseText);
    var town_number = Number(this.number_of_town);
    if (isNaN(town_number) || NearbyPlaces.geonames.length < town_number)
        town_number = getRndInteger(0, NearbyPlaces.geonames.length);
    town = NearbyPlaces.geonames[town_number].name;
    town_output(town);
}

//generates townindex in case of town_number doesnt fit
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//the static Map is loaded 
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=12&size=400x300&key=AIzaSyBCnIvM5rJnbIbcp9LOVnbj0F2oLtwEUBc";
    document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
}