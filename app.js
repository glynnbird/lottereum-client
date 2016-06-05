var express = require('express');
var app = express();
var path = require('path');
var lottereo = require('./lib/lottereo.js').lottereo;;
var draw = require('./lib/draw.js');

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

//serve the homepage
app.get("/", function(req,res) {
   //console.log(req);
   lottereo.getLatestDraw(function(err,data) {
     console.log(err, JSON.stringify(data));
     res.render('index', { 
        title: 'Hey', 
        message: 'oi', 
        latestDraw: data
     });
   });


  // res.sendFile( path.join(__dirname, 'templates', 'index.html') );
});

// get a draw page
app.get("/draw/:id", function(req,res) {
  var address = req.params.id;
  var d = draw.getDraw(address);
  d.getPot(function (eror,data) {
      res.render ('draw', { 
         pot: data
     });
     
  });
});

app.listen(8001, '0.0.0.0', function() {

});
