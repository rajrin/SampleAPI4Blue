/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//
// Application for demonstrating the API proxies on the APIgee edge platform
//------------------------------------------------------------------------------
// requires the customer module
var cust = require('./customer');
var secureresource = require('./secureresource');


// This application uses express as its web server
// for more info, see: http://expressjs.com
console.log("starting");
var express = require('express');
console.log("starting 2");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');



// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

/*** RESTful Like API ************************/

// Get all customers
app.get('/getCustomers',function(req,res){
    res.send(JSON.stringify(cust.getAllCustomers()));
});
    
// Get the customer with specific ID
app.get('/getCustomer',function(req,res){
    var cust_id = req.query.cust_id;
    var customer = cust.getCustomer(cust_id,function(customer){
       if(customer == null){
            res.send({"error":"customer with id="+cust_id +" not found"});
        } else {
            return res.send(JSON.stringify(customer));
        } 
    });
});
// Create a customer
app.get('/createCustomer',function(req,res){
    cust.createCustomer(req.query.fname,req.query.lname,req.query.state, function(){
        res.send({"success":true});
    });
});

app.get('/secureResource', function(req,res){
    secureresource.access(req,res);
});
/*** End *************************************/

// get the app environment from Cloud Foundry

console.log("just before listen");
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


//app.listen(8081, '0.0.0.0', function() {
//  // print a message when the server starts listening
//  console.log("server starting on " + 8081);
//});