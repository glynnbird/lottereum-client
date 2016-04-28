var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));

//serve the homepage
app.get("/", function(req,res) {
   console.log(req);
   res.sendFile( path.join(__dirname, 'templates', 'index.html') );
});

// get a draw page
app.get("/draw/:id", function(req,res) {
  var address = req.params.id;
  res.sendFile( path.join(__dirname, 'templates', 'draw.html') );
});

app.listen(8001, '0.0.0.0', function() {

});
