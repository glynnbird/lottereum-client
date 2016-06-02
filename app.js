var express = require('express');
var app = express();
var path = require('path');
var Web3 = require('web3');
var web3 = new Web3();

app.set('view engine', 'jade');

// configure where our Geth JS API is
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8000'));

var lottereoAbiDef = [{
  constant: true,
  inputs: [{
  name: "",
  type: "uint256"
  }],
  name: "draws",
  outputs: [{
  name: "drawDate",
  type: "uint256"
  }, {
  name: "eth_address",
  type: "address"
  }],
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "getPot",
  outputs: [{
  name: "pot",
  type: "uint256"
  }],
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "getLatestDraw",
  outputs: [{
  name: "_latest",
  type: "address"
  }],
  type: "function"
}, {
  constant: false,
  inputs: [{
  name: "_guess",
  type: "uint256"
  }],
  name: "buyTicket",
  outputs: [],
  type: "function"
}, {
  constant: false,
  inputs: [{
  name: "_eth_address",
  type: "address"
  }],
  name: "addDraw",
  outputs: [],
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "getWinningNumber",
  outputs: [{
  name: "_winner",
  type: "uint256"
  }],
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "numDraws",
  outputs: [{
  name: "",
  type: "uint256"
  }],
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "getPreviousDraw",
  outputs: [{
  name: "_previous",
  type: "address"
  }],
  type: "function"
}, {
  constant: true,
  inputs: [{
  name: "_query",
  type: "address"
  }],
  name: "getPrizeValue",
  outputs: [{
  name: "_value",
  type: "uint256"
  }],
  type: "function"
}, {
  inputs: [],
  type: "constructor"
}];
var lottereoAddress = '0x93ff7ee96a55f777f311f511b19586393f5598df'; 
var lottereo = web3.eth.contract(lottereoAbiDef).at(lottereoAddress);
 
//lottereo.getWinningNumber(function(err,data) {
//  console.log(err, JSON.stringify(data));
//});
//var x = web3.eth.getBalance('0xd7a75f8c9fc6db3b1ac935c60b400f93240ddd73', function(err, data) {
//  console.log("getBalance", err, JSON.stringify(data));
//}); 

   

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
  res.sendFile( path.join(__dirname, 'templates', 'draw.html') );
});

app.listen(8001, '0.0.0.0', function() {

});
