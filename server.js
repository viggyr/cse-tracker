//var http=require('http');
var express = require('express');
var app=express();
var multer  =   require('multer');
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./db.js');
var fs = require('fs');
db.dbConnect();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/Public'));


const storage = multer.diskStorage({
    destination :function(req,file,cb){
    	console.log('destination');
        cb(null,'./question_papers');
    },
    filename : function(req,file,cb){
    	console.log('filename');
        cb(null,file.originalname);
    } 
});

var upload = multer({storage:storage}).single('qpaper');


// *****************GET Api*********************************//
app.get('/student',function(req,res)
	{
		console.log("request accepted");

		db.query(function(rows)
			{
				res.json(['HELLO',]);
			});
		

	});

app.get('/download/:id', function(req, res){
var queryString='select q_name from questionpapers where q_id="'+req.params.id+'";';
db.query(queryString,function(data)
	{
		console.log(data);
  var file = __dirname + '/question_papers/'+data[0].q_name;
  res.download(file); // Set disposition and send it.
	});

});

app.get('/home',function(req,res)
	{
		
		res.sendFile(__dirname+'/Public/homecontent.html');
	});

app.get('/question_papers',function(req,res)
	{
		console.log("question papers");
		res.sendFile(__dirname+'/Public/question_papers.html');
	});

app.get('/insertQpage',function(req,res)
	{
res.sendFile(__dirname+'/Public/insertPaper.html');
	});

app.get('/books',function(req,res)
	{
		res.sendFile(__dirname+'/Public/searchBook.html');
	});


/******************POST Api*****************************/
app.post('/sendQDetails',function(req,res)
	{
var queryString = 'select subject_name,year,q_id from questionpapers Q,subject S where Q.course_id=S.subject_id and subject_name LIKE "%'
+req.body.subject+'%";';
db.query(queryString,function(data)
	{
		console.log(data);
		res.send(data);
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


app.post('/uploads',upload,function(req,res)
	{
	var insertString = "insert into questionpapers (course_id,year,q_name) values ('"+req.body.subject+"','"+req.body.year+"','"+req.file.filename+"');";
db.query(insertString,function(rows)
	{
console.log(rows);
res.send("Question Paper uploaded successfully!!");
	});
	});
app.listen(2020,function()
	{
		console.log("listening to port 2020");
		
		
	});
