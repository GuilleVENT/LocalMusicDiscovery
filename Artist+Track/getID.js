function getID(artist){
    console.log("here");
    
    //var artista = "Morrissey";
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var array = JSON.parse(this.responseText);
            var artist_id = findID(array);
            document.getElementById("output").innerHTML = artist_id;
        }
    });

    
    var url = genUrl(artist);
    xhr.open("GET", url, true);
    xhr.setRequestHeader("accept", "application/json");
    //xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "fb4a04e4-0c1b-8be0-f032-2e4bdd68593f");
    
    
    xhr.send(data);
    console.log(data);    
}
    
function genUrl(artist) {
	var url = "https://api.spotify.com/v1/search?q="+artist+"&type=artist&market=US&limit=1";
    console.log("URL Generated succesfully : ")
    console.log(url);
	return url;
}


function findID(array){
    var parsedsearch = array;
    console.log("-------------------------PARSEDSEARCH-------------------------");
    console.log(parsedsearch);
    console.log("-------------------------PARSEDSEARCH-------------------------");
    var parsedsearchartists = parsedsearch.artists;
    console.log("-------------------------PARSEDSEARCHARTISTS-------------------------");
    console.log(parsedsearchartists);
    console.log("-------------------------PARSEDSEARCHARTISTS-------------------------");
    var parsedsearchartistsitems = parsedsearchartists.items;
    console.log("-------------------------PARSEDSEARCHARTISTSITEMS-------------------------");
    console.log(parsedsearchartistsitems);
    console.log("-------------------------PARSEDSEARCHARTISTSITEMS-------------------------");
    var firstresult = parsedsearchartistsitems[0];
    console.log("-------------------------FIRSTRESULT-------------------------");
    console.log(firstresult);
    console.log("-------------------------FIRSTRESULT-------------------------");

    var artist_id = firstresult.id;
    console.log("-------------------------ARTIST ID-------------------------");
    console.log(artist_id);
    console.log("-------------------------ARTIST ID-------------------------");
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
            document.getElementById("output2").innerHTML = TOPsongs;
        }
    });
    
     var url2 = genUrl2(artist_id);
    xhr.open("GET", url2, true);
    xhr.setRequestHeader("accept", "application/json");
    //xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "fb4a04e4-0c1b-8be0-f032-2e4bdd68593f");
    
    
    xhr.send(data);
    console.log(data);    
}

function genUrl2(artist_id){
	var url2 = "https://api.spotify.com/v1/artists/"+artist_id+"/top-tracks?country=DE";
    console.log("URL2 Generated succesfully : ")
    console.log(url2);
	return url2;
}

function tracksID(array){
    var tracks_id = [];
    var parsedbody = array;
    console.log("-------------------------PARSEDBODY = ARRAY");
    console.log(parsedbody);
    console.log("--------------------------parsedbodytracks");
    var parsedbodytracks = array.tracks;
    console.log(parsedbodytracks);
    console.log("-----------------FORLOOP-----------------");
   
    for(var i=0; i<10; i++){
        var tracksinfo = parsedbodytracks[i];
                    //  console.log("...........................................tracksinfo = parsedbodytracks[i]")
                    //  console.log(tracksinfo);

        tracks_id[i] = tracksinfo.id;
      
        console.log(tracks_id[i]);    

    }
    console.log("----------------END FORLOOP---------------");
    console.log(tracks_id);
    
    return tracks_id;
}