
function callMb(city_) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	    xml_string= this.responseText;
	    var new_artist = get_artist_from_xml(xml_string);
		console.log(new_artist); //final artist
//	    document.getElementById("output").innerHTML = new_artist;   //this is for the test-html output
	    return new_artist; // this is for site use
    }
  };
  var url = genUrl(city_);  //url is generated
  xhttp.open("GET", url , true);
  xhttp.send();
}


function genUrl(city) {
	var url = "https://musicbrainz.org/ws/2/artist/?query=area:" + city.value;
	return url;
}


function get_artist_from_xml(xml) {
    // Parse the XML string into a XMLDocument
    var doc = window.DOMParser
                ? new DOMParser().parseFromString(xml_string, 'text/xml')    // Standard
                : new ActiveXObject('Microsoft.XMLDOM').loadXML(xml_string); // IE

    // Find the 'name' nodes and save into artist_nodes
    var artist_nodes = doc.getElementsByTagName('name');
//    console.log(artist_nodes);      // this array is filled
	var neededElements = [];

	for (var i = 0; i < artist_nodes.length; i++) {
 		  if (artist_nodes[i].parentNode.nodeName == 'artist') {
//        	neededElements.push(artist_nodes[i]) // this are all artists
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
	var rand = artist[Math.floor(Math.random() * artist.length)]; //random entry from artist array
    return rand;
}



