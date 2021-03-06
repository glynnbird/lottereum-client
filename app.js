var express = require('express');
var app = express();
var async = require('async');
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

  async.parallel([
    d.getPot,
    d.drawn,
    d.numTickets,
    d.drawDate,
    d.winningNumber,
    d.payout,
    d.nextDraw,
    d.previousDrawAddress
  ], function(err, results) {

     var drawData = { 
         pot: results[0],
         drawn: results[1],
         numTickets: results[2],
         drawDate: results[3],
         winningNumber: results[4],
         payout: results[5],
         nextDraw: results[6],
         previousDrawAddress: results[7]
     };

     // create array of tasks to extract each winning Ticket in turn
     var winners = [];
     var i = 0;
     var done = false;
     async.doUntil(function(callback) {
       d.winningaddresses(i++, function(err, data ) {
         if (data == "0x") {
           done = true;
         } else { 
           winners.push(data);
         }
         callback();
       }); 
     },function() {
       return done;
     }, function() {
       drawData.winners = winners;
       res.render ('draw', drawData);  
     });

  });

});

app.listen(8001, '0.0.0.0', function() {

});
