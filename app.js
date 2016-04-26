var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));

// get the public UI
app.get("/draw/:id", function(req,res) {
  var address = req.params.id;
  res.sendFile( path.join(__dirname, 'public', 'index.html') );
});

app.listen(8001, '0.0.0.0', function() {

});
