//var http=require('http');
var express = require('express');
var app=express();
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./db.js');
db.dbConnect();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public'));
app.get('/student',function(req,res)
	{
		console.log("request accepted");

		db.query(function(rows)
			{
				res.json(['HELLO',]);
			});
		

	});
app.post('/search', function(req, res) {
	console.log(req.body);

	var queryString = "select B.title, S.subject_name ,A.author_name, B.copies from books B,subject S,author A where B.subject_id = S.subject_id"+
	  " and B.author_id = A.author_id and B.title LIKE'%"+req.body.title+"%' and A.author_name LIKE'%"+req.body.author+"%';" ;
	  db.query(queryString,function(data)
	  	{
	  		console.log(data);
	  		res.send(data);
	  	}); 
 
});
app.post('/registration',function(req,res)
	{
		var insertString ="insert into faculty () values {";
	});


app.listen(2020,function()
	{
		console.log("listening to port 2020");
		
		
	});
