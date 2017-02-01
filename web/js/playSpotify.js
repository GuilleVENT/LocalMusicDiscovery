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

    var firstresult = parsedsearchartistsitems[0];


    var artist_id = firstresult.id;

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
            document.getElementById('myIframe').src = "https://embed.spotify.com/?uri=spotify:track:" + TOPsongs[4];
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


    for(var i=0; i<10; i++){
        var tracksinfo = parsedbodytracks[i];
                    //  console.log("...........................................tracksinfo = parsedbodytracks[i]")
                    //  console.log(tracksinfo);

        tracks_id[i] = tracksinfo.id;

        console.log(tracks_id[i]);

    }

    return tracks_id;

}


function callMb(city_) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	    xml_string= this.responseText;
	    var new_artist = get_artist_from_xml(xml_string);
		console.log(new_artist); //final artist
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
//        	console.log(artist[i]);
//		}
    }
	var rand = artist[Math.floor(Math.random() * neededElements.length)]; //random entry from artist array
// console.log(rand);
    return rand;
}

function changeSong(){

  var city = "berlin";
  var artist = callMb(city);
  console.log(artist);
//  setTimeout(function(){},2000);

  document.getElementById('nowPlaying').innerHTML = "Now playing: " + artist;



}
