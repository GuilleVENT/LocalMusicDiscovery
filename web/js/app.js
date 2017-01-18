/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'fa83a2fec7c440b7a2795d600d6b2c7e'; // Your client id
var client_secret = '71ef2f303a764089b7e63a32bb888ef8'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token				// OR access_token
      });
    }
  });
});

/* Adding the script tag to the head as suggested before */

// CREATE PLAYLIST INIT

// Variables para mi:
var acc_token = "BQAApQ-g6dLWXHIxw2yD5Qk_g26AK3cxnPcr67qm9hnFK-Kyf8FKZqTOXlM9kNp9g8Ho29UjBHcse4jQUz0I7vuhT8STMvGB97kTuBfokR4mYXQtkWWVgDYatQYmzuGtlQrioPZDFMZRKuJRAktrM3Jvmp84RBwhYYS-Lu0kILBbPHrbmG1V1Xc_wKyRnLSxREur7v84m57tHRGLP4qcb2gIpwoT-DEgho8nfw";
var userme = "neutralmilkpenguin";

var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.spotify.com",
  "port": null,
  "path": "/v1/users/"+userme+"/playlists",
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer "+acc_token,
    "content-type": "application/json",							/* ^^^ AQUI ARRIBA HAY QUE CAMBIAR EL ACCESS_TOKEN ^^^ */
    "cache-control": "no-cache",
    "postman-token": "92ec5ff0-565e-25d0-6677-de1726981013"
  }
};

var id = "id";
var playlist_info = [];
var playlist_id;

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var parsed = JSON.parse(body);
    for(var x in parsed){
      playlist_info.push(parsed[x]);
      }
    console.log(playlist_info[5]);
    playlist_id = playlist_info[5];
    console.log(playlist_id);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ name: 'Big Fat Blunt' , public: false }));
req.end();




// CREATE PLAYLIST END

// GET ARTIST TOP TRACKS INIT

var http = require("https");


var artist_id = "2QsynagSdAqZj3U9HgDzjD";			//"BOB MARLEY AND THE WAILERS"
// var tracks_id = new Array();


var options = {
  "method": "GET",
  "hostname": "api.spotify.com",
  "port": null,
  "path": "/v1/artists/"+artist_id+"/top-tracks?country=ES",
  "headers": {		/* ^^ARTIST ID^^ = "BOB MARLEY AND THE WAILERS"=2QsynagSdAqZj3U9HgDzjD*/
    "accept": "application/json",
    "authorization": "Bearer "+acc_token,
    "cache-control": "no-cache",
    "postman-token": "2b6a3f3e-243f-635d-216a-cdb635e3b819"
  }
};

									//ID estas 10 Canciones
var tracks_id = [];

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var parsedbody = JSON.parse(body);
    var stringparsedbody = JSON.stringify(parsedbody);
    var parsedbodytracks = parsedbody.tracks;
    //for-loop comes here:

	console.log("-------------------------------FORLOOP-----------------------");
    for(var i=0; i<10; i++){
      var tracksinfo = parsedbodytracks[i];
    //  console.log("...........................................tracksinfo = parsedbodytracks[i]")
    //  console.log(tracksinfo);

      tracks_id[i] = tracksinfo.id;

      console.log(tracks_id[i]);

    }
    console.log("-------------------------------END FORLOOP----------------------");
    console.log(tracks_id);

    console.log(body.toString());
  });
});

req.end();





// GET ARTIST TOP TRACKS END


// ADD TRACKS TO PLAYLIST INIT
setTimeout(addtracksplaylist(),3000);

funcion addtracksplaylist(){


var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.spotify.com",
  "port": null,																				/*aqui abajo siempre pone %3A....track_id....%2C / tenemos que conseguir que los tracks id encontrados en GET ARTIST TOP TRACKS acaben aqui colocados*/
  "path": "/v1/users/"+userme+"/playlists/"+playlist_id+"/tracks?uris=spotify%3Atrack%3A"+tracks_id[0]+"%2Cspotify%3Atrack%3A"+tracks_id[1]+"%2Cspotify%3Atrack%3A"+tracks_id[2]+"%2Cspotify%3Atrack%3A"+tracks_id[3]+"%2Cspotify%3Atrack%3A"+tracks_id[4]+"%2Cspotify%3Atrack%3A"+tracks_id[5]+"%2Cspotify%3Atrack%3A"+tracks_id[6]+"%2Cspotify%3Atrack%3A"+tracks_id[7]+"%2Cspotify%3Atrack%3A"+tracks_id[8]+"%2Cspotify%3Atrack%3A"+tracks_id[9],
  "headers": {		/*		¿COMO DESCUBRIMOS ^^^^^^ EL ID DE LA PLAYLIST?			*/
    "accept": "application/json",
    "authorization": "Bearer "+acc_token,
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "8bf1bae5-85f1-e97b-62df-02ddd4a54297"
  }
};




var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
}

// ADD TRACKS TO PLAYLIST END




console.log('Listening on 8888');
app.listen(8888);

//var urlString = 'https://api.spotify.com/v1/users/' + client_id + '/playlists';
// REFRESH_TOKEN : AQCmvN_-2K0bk7g5MmYBr11hu8NR6uJ3AviD9iOkmdwHhXJl75dtNnUAHgUo3HS9Jlijgq3Rp26rS-fXZUmWFtq4oqfdLXaP7rYQ0j387z2pc9m_FfDAtpaLAInFLcBhJ_E
