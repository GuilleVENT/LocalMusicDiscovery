
function getID(artist){

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;


    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var array = JSON.parse(this.responseText);
            var artist_id = findID(array);
//            document.getElementById("output").innerHTML = artist_id;

        }
    });


    var url = genUrl(artist);
    xhr.open("GET", url, true);
    xhr.setRequestHeader("accept", "application/json");
    //xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "fb4a04e4-0c1b-8be0-f032-2e4bdd68593f");


    xhr.send(data);
//    console.log(data);

}

function genUrl(artist) {

	var url = "https://api.spotify.com/v1/search?q="+artist+"&type=artist&market=DE&limit=1";
//    console.log("URL Generated succesfully : ")
//console.log(url);
	return url;

}


function findID(array){

    var parsedsearch = array;

    var parsedsearchartists = parsedsearch.artists;

    var parsedsearchartistsitems = parsedsearchartists.items;

    if(parsedsearchartistsitems.length < 1 ){
    	console.log("THIS ARTIST COULDN'T BE FOUND IN SPOTIFY...looking for a new LOCAL MUSICIAN");

    	var rand = LocalMusician[Math.floor(Math.random() * LocalMusician.length)];
    	getID(rand);
    	document.getElementById('nowPlaying').innerHTML = "Now playing: " + rand;

    }

   	var firstresult = parsedsearchartistsitems[0];

  		 // console.log(firstresult);

   	var name = firstresult.name;



   	var artist_id = firstresult.id;
   	console.log(">>"+artist_id);
    TOPtracks(artist_id);
    return artist_id;

}


function TOPtracks(artist_id){

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var array = JSON.parse(this.responseText);
            var TOPsongs = [];
            TOPsongs = tracksID(array);
            var RANDsong = TOPsongs[Math.floor(Math.random() * TOPsongs.length)];
           	document.getElementById('myIframe').src = "https://embed.spotify.com/?uri=spotify:track:" + RANDsong;	//one of the top songs of the local artist chosen at random!

        }
    });

    var url2 = genUrl2(artist_id);
    xhr.open("GET", url2, true);
    xhr.setRequestHeader("accept", "application/json");
    //xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "fb4a04e4-0c1b-8be0-f032-2e4bdd68593f");


    xhr.send(data);
//    console.log(data);

}

function genUrl2(artist_id){
	var url2 = "https://api.spotify.com/v1/artists/"+artist_id+"/top-tracks?country=DE";
//console.log("URL2 Generated succesfully : ")
//    console.log(url2);
	return url2;
}

function tracksID(array){

    var tracks_id = [];
    var parsedbody = array;


    var parsedbodytracks = array.tracks;

 //   console.log("parsedbodytracks");
 //   console.log(parsedbodytracks);

 	if(parsedbodytracks.length < 1){
 		console.log("THIS ARTIST HAS NO SONGS AVAILABLE IN SPOTIFY");
 		var rand = LocalMusician[Math.floor(Math.random() * LocalMusician.length)];
    	getID(rand);
    	document.getElementById('nowPlaying').innerHTML = "Now playing: " + rand;
 	}

    for(var i=0; i<parsedbodytracks.length; i++){
        var tracksinfo = parsedbodytracks[i];
                    //  console.log("...........................................tracksinfo = parsedbodytracks[i]")
                    //  console.log(tracksinfo);

        tracks_id[i] = tracksinfo.id;

        console.log(tracks_id[i]);

    }

    return tracks_id;

}
var LocalMusician = [];			// LOCALMUSICION GLOBALLY GESPEICHERT

function callMb(city_) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	    xml_string= this.responseText;
	    var new_artist = get_artist_from_xml(xml_string);
		console.log(">>"+new_artist); //final artist
		if(new_artist == "undefined"){
			phi+=1;
			var j = towns_array[phi];
			callMb(j);
		}

//	    document.getElementById("output").innerHTML = new_artist;   //this is for the test-html output
	    getID(new_artist); // this is for site use
      document.getElementById('nowPlaying').innerHTML = "Now playing: " + new_artist;
    }
  };
  var urlMB = genUrlMB(city_);  //url is generated
  xhttp.open("GET", urlMB , true);
  xhttp.send();
}


function genUrlMB(city) {
	var url = "https://musicbrainz.org/ws/2/artist/?query=area:" + city;


	return url;
}


function get_artist_from_xml(xml) {
    // Parse the XML string into a XMLDocument
//    console.log(xml);
    var doc = window.DOMParser
                ? new DOMParser().parseFromString(xml_string, 'text/xml')    // Standard
                : new ActiveXObject('Microsoft.XMLDOM').loadXML(xml_string); // IE

    // Find the 'name' nodes and save into artist_nodes
    var artist_nodes = doc.getElementsByTagName('name');
//    console.log(artist_nodes);      // this array is filled
	   var neededElements = [];

	for (var i = 0; i < artist_nodes.length; i++) {
 		  if (artist_nodes[i].parentNode.nodeName == 'artist') {
        	neededElements.push(artist_nodes[i]) // this are all artists
    	}
    }
//  	console.log(neededElements);  // now this is filled
	var artist = [];
    // Loop through them and save their text content into an array
    for (var i = 0; i < neededElements.length; i++) {
//        if (artist_nodes[i].parentNode == 'artist') {
        	artist.push(neededElements[i].firstChild.data)
        	console.log(artist[i]);
//		}
    }
    LocalMusician = artist;

//    var randoms = choose_random_artist(artist);

	var rand = artist[Math.floor(Math.random() * neededElements.length)]; //random entry from artist array
// console.log(rand);
    return rand;
}
//  <div id="mapholder"></div>
//  <p id="city"></p>
/*
function choose_random_artist(artist){
	var rand = artist[Math.floor(Math.random() * neededElements.length)];

}
*/

//Place HERE INSIDE THE town_output Function Your CODE TO BE RUN WITH THE town. Here inside you can work with the object "town"      Mabe you can also use the function town_output() as a input argument in your function

<<<<<<< Updated upstream
var town_t;			// TOWN GLOABALLY GESPEICHERT 		
var towns_array	= [];
var phi = 0;
=======
var town_t;			// TOWN GLOABALLY GESPEICHERT

>>>>>>> Stashed changes

function town_output(town) {
    //to show it works
    // document.getElementById("city").innerHTML = town;


    callMb(towns_array[phi]);
    console.log(town);
}

//Get the Position from your browser. If you dont have wlan=on and its not a mobile device, the position is those of the main routing point
function getLocation(number_of_town) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          //  showPosition(position);
            //here the argument parse_function will be also the callback function
           // console.log("here");
           // console.log(position);
            //console.log(parse_function);
            //console.log(number_of_town);
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
    var url = "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + latit + "&lng=" + longit + "&maxRows=50&radius=100&cities=cities15000&lang=EN&username=LocalMusicDiscovery";
    return url;
}

//Runns as last function before town_output. Input is the the callback function. If the town_number exceeds the list, one town nearby is picked randomly
function parse_function() {
    NearbyPlaces = JSON.parse(this.responseText);
    var town_number = Number(this.number_of_town);
    if (isNaN(town_number) || NearbyPlaces.geonames.length < town_number)
        town_number = getRndInteger(0, NearbyPlaces.geonames.length);
    town = NearbyPlaces.geonames[town_number].name;

    for(var i=0 ; i < NearbyPlaces.geonames.length; i++){
    	var city = NearbyPlaces.geonames[i];
    	towns_array.push(city.name);
    }
    console.log(towns_array);
    town_output(town);
}

//generates townindex in case of town_number doesnt fit
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//the static Map is loaded
/*
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    console.log(latlon);
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=12&size=400x300&key=AIzaSyBCnIvM5rJnbIbcp9LOVnbj0F2oLtwEUBc";
    document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
}
*/
function changeSong() {


	if(towns_array.length<1){
 	 	getLocation(0);
 
	}
	else{
		console.log(towns_array[phi]);
		callMb(towns_array[phi])
	}
//  setTimeout(function(){},2000);

//  document.getElementById('nowPlaying').innerHTML = "Now playing: " + artist;

}
