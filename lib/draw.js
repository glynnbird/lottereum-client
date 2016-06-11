var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8000'));

var drawAbiDef = [{
    constant: true,
    inputs: [],
    name: "entryFee",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_newContract",
        type: "address"
    }],
    name: "transferPot",
    outputs: [],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "previousDrawAddress",
    outputs: [{
        name: "",
        type: "address"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "nextDraw",
    outputs: [{
        name: "",
        type: "address"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "numTickets",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [{
        name: "",
        type: "uint256"
    }],
    name: "winningaddresses",
    outputs: [{
        name: "",
        type: "address"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "getPot",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "winningNumber",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [{
        name: "",
        type: "uint256"
    }],
    name: "tickets",
    outputs: [{
        name: "guess",
        type: "uint256"
    }, {
        name: "eth_address",
        type: "address"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "payout",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: false,
    inputs: [{
        name: "_buyer",
        type: "address"
    }, {
        name: "_guess",
        type: "uint256"
    }],
    name: "buyTicket",
    outputs: [{
        name: "ticketid",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "organiser",
    outputs: [{
        name: "",
        type: "address"
    }],
    type: "function"
}, {
    constant: true,
    inputs: [],
    name: "drawDate",
    outputs: [{
        name: "",
        type: "uint256"
    }],
    type: "function"
}, {
    constant: false,
    inputs: [],
    name: "doDraw",
    outputs: [],
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
    constant: true,
    inputs: [],
    name: "drawn",
    outputs: [{
        name: "",
        type: "bool"
    }],
    type: "function"
}, {
    inputs: [{
        name: "_offset",
        type: "uint256"
    }, {
        name: "_entryFee",
        type: "uint256"
    }, {
        name: "_organiser",
        type: "address"
    }, {
        name: "_previousDrawAddress",
        type: "address"
    }],
    type: "constructor"
}, {
    anonymous: false,
    inputs: [{
        indexed: false,
        name: "_ticketid",
        type: "uint256"
    }],
    name: "BuyTicket",
    type: "event"
}, {
    anonymous: false,
    inputs: [{
        indexed: false,
        name: "_winningNumber",
        type: "uint256"
    }],
    name: "DrawDone",
    type: "event"
}];

function getDraw (drawAddress) {

   var draw = web3.eth.contract(drawAbiDef).at(drawAddress);
   return draw;

}


module.exports = {getDraw : getDraw};
