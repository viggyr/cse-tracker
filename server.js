//var http=require('http');
var express = require('express');
var app=express();
var db = require('./db.js');
db.dbConnect();

app.use(express.static(__dirname + '/public'));
app.get('/student',function(req,res)
	{
		console.log("request accepted");

		db.query(function(rows)
			{
				res.json(['HELLO',]);
			});
		

	});

app.listen(2020,function()
	{
		console.log("listening to port 2020");
		
		
	});
