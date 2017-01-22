
function getArtistId(){

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


  // GET ARTIST ID INIT
  var artisname = "Morrissey";
  var acc_token = "BQCZVjpd2lb1IlqP-HnNnnJviRJQ3nT8TjQCXkOxvFIWR4xTNeCvOEPOwp6rWfc_Ze7y7XWgGHPSM1eX1fDkLtzRUwRey69kDvcfCP1X-tjjEU57hWnx1nBBfTt2LHMeWdACL444-wNaYnn3R2JjuOlOP39UGcnjNmIeVdVzM-eUHnvbSwl97RILGRZaehzcYY25_fHg4yKZc2KCAgu5HiJ9b-8hsBTg16x1mg";

  var options1 = {
    "method": "GET",
    "hostname": "api.spotify.com",
    "path": "/v1/search?q="+artisname+"&type=artist",
    "headers":{
      "accept": "application/json",
      "authentization": "Barer"+acc_token,
    }
  }
  var http = require("https");

  var req = http.request(options1, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      var parsedsearch = JSON.parse(body);

      var parsedsearchartists = parsedsearch.artists;

      var parsedsearchartistsitems = parsedsearchartists.items;
      var firstresult = parsedsearchartistsitems[0];

      var artist_id = firstresult.id;


    });
  });

  req.end();


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
          'access_token': access_token        // OR access_token
        });
      }
    });
  });
  var acc_token = "BQAKjhG9RsItF7fLwNomawmC6pIm4usV2mUue1_25EtYsaK_4OJhI11QmDsJZCnWOIRQCIV8BBiyeuJPXXPCgvjT9QukLF1ZBoN-wClwP_hk_oyPPlWuaEVJgWbYgRhO_BUAQ_pGZ5HwLe3osNcqBAaEZuY-7CVIh-VCyEZ_W-yRExmxT-uuYSPQxYA10oVeW7pLp4xefwiU_JxALNBzclnR1kM8A9V48RZ5qw";
  var userme = "neutralmilkpenguin";
  /* Adding the script tag to the head as suggested before */

  return artist_id;

}

function getArtistTopTracks(){

  // GET ARTIST TOP TRACKS INIT


  var http = require("https");


  var artist_id = "3iTsJGG39nMg9YiolUgLMQ";     //MORRISSEY
  // var tracks_id = new Array();


  var options = {
    "method": "GET",
    "hostname": "api.spotify.com",
    "port": null,
    "path": "/v1/artists/" + artist_id + "/top-tracks?country=DE",
    "headers": {    /* ^^ARTIST ID^^ = "BOB MARLEY AND THE WAILERS"=2QsynagSdAqZj3U9HgDzjD*/
      "accept": "application/json",
      "authorization": "Bearer "+acc_token,
      "cache-control": "no-cache",
      "postman-token": "2b6a3f3e-243f-635d-216a-cdb635e3b819"
    }
  };

                      //ID estas 10 Canciones
  //var map;
  //var tracksinfo1;

  //var tracksid = [];

  //var songid = new Array(10)
  //var arr = [];



  var tracks_id = [];

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);

      var stringparsedbody = JSON.stringify(parsedbody);

      var parsedbody = JSON.parse(body);

      var parsedbodytracks = parsedbody.tracks;

      var parsedbodytracksNULL = parsedbodytracks[0];

      var parsedbodytracksNULLid = parsedbodytracksNULL.id;


        //ONE LOVE - REMIX id :1w5sLDYzYAGI0AkLc6FPlO
        //^^^FUCKING WORKS^^^

      for(var i=0; i<10; i++){
        var tracksinfo = parsedbodytracks[i];
      //  console.log("...........................................tracksinfo = parsedbodytracks[i]")
      //  console.log(tracksinfo);

        tracks_id[i] = tracksinfo.id;

        console.log(tracks_id[i]);

      }
    });
  });

  req.end();


  return track_id[2];

}



function changeSong() {
    document.getElementById('myIframe').src = "https://embed.spotify.com/?uri=spotify:track:" + getArtistTopTracks();
}
