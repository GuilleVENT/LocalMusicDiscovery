/*var app = angular.module("app", []);

app.controller("controller", function($scope, $http) {
  $scope.nom = "Muse";

  $scope.search = function() {
    var url = "http://musicbrainz.org/ws/2/artist/?query=artist:" + $scope.nom + "&fmt=json";

    $http.get(url)
      .then(function(response) {
        $scope.listenoms = response.data.artists;
        console.log($scope.listenoms);
      });
  };
});
*/
// https://musicbrainz.org/ws/2/artist/?query=area:hamburg

function callMb(city_) {
  var city = city_
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     xml_string= this.responseText;
     var new_artist = get_artist_from_xml(xml_string);
     document.getElementById("output").innerHTML = new_artist;
    }
  };
  xhttp.open("GET", "https://musicbrainz.org/ws/2/artist/?query=area:berlin", true);
  xhttp.send();
}


//var xml_string = '<answers><answer id="0">hello</answer><answer id="1">goodbye</answer></answers>';
//var answers = get_artist_from_xml(xml_string);

function get_artist_from_xml(xml) {
    // Parse the XML string into a XMLDocument
    var doc = window.DOMParser
                ? new DOMParser().parseFromString(xml_string, 'text/xml')    // Standard
                : new ActiveXObject('Microsoft.XMLDOM').loadXML(xml_string); // IE

    // Find the artist name nodes
    var artist_nodes = doc.getElementsByTagName('name');
    var artist = [];

    // Loop through them and save their text content into an array
    for (var i = 0; i < artist_nodes.length; i++) {
        artist.push(artist_nodes[i].firstChild.data)
    }
	var rand = artist[Math.floor(Math.random() * artist.length)]; //random entry from artist array
    return rand;
}


