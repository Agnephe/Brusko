//importing express into a variable (a function call)
var express = require('express');

var app = express();
var server = app.listen(3000);

// wanting the app to host what is inside the 'public' folder
app.use(express.static('public'));


console.log("my socket server is running");