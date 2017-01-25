
// https://musicbrainz.org/ws/2/artist/?query=area:hamburg

function callMb(city_) {
//  var city = city_
//  var url = "https://musicbrainz.org/ws/2/artist/?query=area:" + "berlin";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     xml_string= this.responseText;
     var new_artist = get_artist_from_xml(xml_string);
     document.getElementById("output").innerHTML = new_artist;
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
/*	var neededElements = [];
	for (var i = 0, i < artist_nodes.length; i++) {
 		  if (artist_nodes[i].parentNode == 'artist') {
        	neededElements.push(artist_nodes[i])
    	}
    }  */
	var artist = [];
    // Loop through them and save their text content into an array
    for (var i = 0; i < artist_nodes.length; i++) {
//        if (artist_nodes[i].parentNode == 'artist') {
        	artist.push(artist_nodes[i].firstChild.data)
//		}
    }
	var rand = artist[Math.floor(Math.random() * artist.length)]; //random entry from artist array
    return rand;
}
