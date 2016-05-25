var express = require('express');
var app     = express();
var fs      = require('fs');
var content = require("./public/data/inventory.json");
var chocolates = content.chocolates;

// app.use(express.static('public/'));
app.use(express.static( __dirname + '/public' ));


// app.get('/', function ( request, response ) {
//   console.log( content);
//   response.send( JSON.stringify(content), null, 3 );
// })

app.get('/', function ( request, response ) {
  response.render('index', {
    data: content,
    helpers: {
      json: function( obj ){
        return JSON.stringify(obj);
      }
    }
  });
})

app.listen(3000);