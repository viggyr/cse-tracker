//var http=require('http');
var express = require('express');
var app=express();
var db = require('./db.js');

app.listen(2020,function()
	{
		console.log("listening to port 2020");
		db.dbConnect();
		db.inst();
	});
