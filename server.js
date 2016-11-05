//var h ttp=require('http');
var express = require('express');
var app=express();
var multer  =   require('multer');
var flash = require('connect-flash');
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./db.js');
var fs = require('fs');
var session      = require('express-session');
db.dbConnect();
app.use(cors());

app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/Public'));
var passport = require('passport');
var lstartegy=require('./passport.js');

lstartegy(passport);
app.use(session({ secret: 'viggyman',saveUninitialized: true,
	resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
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
app.get('/success',function(req,res)
{
	console.log("registraion successfull");



});
app.get('/fail',function(req,res)
{
	console.log("registraion failed");



});
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    {
    	console.log('authenticated');
    	return next();
    }

    // if they aren't redirect them to the home page
    res.sendFile(__dirname+'/Public/index.html');
}
app.get('/download/:id', function(req, res){
	var queryString='select q_name from questionpapers where q_id="'+req.params.id+'";';
	db.query(queryString,function(data)
	{
		console.log(data);
		var file = __dirname + '/question_papers/'+data[0].q_name;
  res.download(file); // Set disposition and send it.
});

});
app.get('/homepage',function(req,res)
{  
	console.log('homepage');
	res.sendFile(__dirname+'/Public/home.html');
});
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
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

app.get('/insertQpage',isLoggedIn,function(req,res)
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

	var queryString = "select B.title, S.subject_name ,A.author_name, B.copies from books B,subject S,author A "
	+"where B.subject_id = S.subject_id"+
	" and B.author_id = A.author_id and B.title LIKE'%"+req.body.title+"%' and A.author_name LIKE'%"+req.body.author+"%';" ;
	db.query(queryString,function(err,data)
	{
		console.log(data);
		res.send(data);
	}); 

});



app.post('/registration',passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/register'
}));
app.post('/login',passport.authenticate('local-login', {
	successRedirect: '/homepage',
	failureRedirect: '/'
}));
app.get('/register',function(req,res)
{
	res.sendFile(__dirname+'/Public/registration_page.html');
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
