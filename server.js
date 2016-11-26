//var h ttp=require('http');
var express = require('express');
var app=express();
var multer  =   require('multer');
var flash = require('connect-flash');
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./db.js');
var fs = require('fs');
var nodemailer=require('nodemailer');
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
sendMail();
var upload = multer({storage:storage}).single('qpaper');

app.get('/',FirstTime,function(req,res)
{

	res.sendFile(__dirname+'/html_files/home.html');

});

// *****************GET Api*********************************//
app.get('/success',function(req,res)
{
	console.log("registraion successfull");



});
app.get('/fail',function(req,res)
{
	console.log("registraion failed");



});
function FirstTime(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    {
    	console.log('authenticated');
    	return next();
    }

    // if they aren't redirect them to the home page
    res.sendFile(__dirname+'/html_files/index.html');
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    {
    	console.log('authenticated');
    	return next();
    }

    // if they aren't redirect them to the home page
    res.status(401).send();
}
function isLoggedInLibrary(req, res, next) {
console.log(req.user);
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated() && req.user.role==2)
    {
    	console.log('authenticated');
    	return next();
    }

    // if they aren't redirect them to the home page
    res.sendFile(__dirname+'/html_files/libraryUnauthorized.html');
}
app.get('/download/:id', function(req, res){
	var queryString='select q_name from questionpapers where q_id="'+req.params.id+'";';
	db.query(queryString,function(err,data)
	{
		console.log(data);
		var file = __dirname + '/question_papers/'+data[0].q_name;
  res.download(file); // Set disposition and send it.
});

});
app.get('/homepage',function(req,res)
{  
	console.log('homepage');
	res.sendFile(__dirname+'/html_files/home.html');
});
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/home',function(req,res)
{  

	res.sendFile(__dirname+'/html_files/homecontent.html');
});
app.get('/getIssueDetailsPage',function(req,res)
{  
	console.log('here');
	res.sendFile(__dirname+'/html_files/issue_details.html');
});

app.get('/question_papers',function(req,res)
{
	
	res.sendFile(__dirname+'/html_files/question_papers.html');
});

app.get('/insertQpage',isLoggedIn,function(req,res)
{
	console.log(req.user);
	res.sendFile(__dirname+'/html_files/insertPaper.html');
});

app.get('/books',function(req,res)
{
	res.sendFile(__dirname+'/html_files/searchBook.html');
});
app.get('/getIssuePage',isLoggedInLibrary,function(req,res)
{
	res.sendFile(__dirname+'/html_files/book_issue.html');
});
app.get('/getProjectpage',isLoggedIn,function(req,res)
{
	res.sendFile(__dirname+'/html_files/project_form.html');
});
app.get('/loadFaculty',function(req,res)
	{
		res.sendFile(__dirname+'/html_files/facultyPage.html');
	});
app.get('/getProjectDetailsPage',function(req,res)
{
	res.sendFile(__dirname+'/html_files/projects.html');
});
app.get('/getSubHand',function(req,res)
{
	res.sendFile(__dirname+'/html_files/subjectHandled.html');
});
app.get('/getFacultyPage',function(req,res)
{
	res.sendFile(__dirname+'/html_files/faculty_form.html');
});
app.get('/getTtPage',function(req,res)
{
	res.sendFile(__dirname+'/html_files/Ttpage.html');
});
/******************POST Api*****************************/
app.post('/sendQDetails',function(req,res)
{
	var queryString = 'select subject_name,year,q_id from questionpapers Q,subject S where Q.course_id=S.subject_id and subject_name '+
	'LIKE "%'+req.body.subject+'%";';
	db.query(queryString,function(err,data)
	{
		console.log(req.body.subject);
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
app.get('/failed',FirstTime,function(req,res)
{

	res.render('login', {
        loginMessage: req.flash('loginMessage')
    });
});
app.post('/login',passport.authenticate('local-login', {
	successRedirect: '/homepage',
	failureRedirect: '/failed'
}));
app.get('/register',function(req,res)
{
	res.sendFile(__dirname+'/html_files/registration_page.html');
});

app.post('/uploads',upload,function(req,res)
{
	var insertString = "insert into questionpapers (course_id,year,q_name) values ('"+req.body.subject+"','"
	+req.body.year+"','"+req.file.filename+"');";
	db.query(insertString,function(err,rows)
	{
		console.log(rows);
		res.send("Question Paper uploaded successfully!!");
	});
});
app.post('/insertIssue',function(req,res)
{
	var insertString = 'insert into issued values ("'+req.body.usn+'","'+req.body.isbn+'","'+formatDate(req.body.issue_date)+'","'+
	formatDate(req.body.return_date)+'","'+1+'");';
	db.query(insertString,function(err,rows)
	{
		var updateString='update books set copies =copies-1 where isbn = "'+req.body.isbn+'";';
		db.query(updateString,function(err,data)
			{
				res.send('Successfully added the issue into database');
			});
		
	});			
});
app.post('/insertReturn',function(req,res)
{

	var updateString = 'update issued set isactive = 0 where usn="'+req.body.usn+'"and isbn="'+req.body.isbn+'";';
	db.query(updateString,function(err,rows)
	{
		updateString='update books set copies =copies+1 where isbn = "'+req.body.isbn+'";';
		db.query(updateString,function(err,rows)
			{
				res.send('Successfully modified the databse after returning the book');
			});
		
	});			
});
app.post('/issue_search',function(req,res)
{
	var queryString = 'select s.email,b.title,i.usn,i.issue_date,i.return_date from issued i,books b,student s where s.usn=i.usn'
	+' and i.isbn=b.ISBN and i.isactive=1 and i.usn LIKE "%'+req.body.usn+'%" and b.title LIKE "%'+req.body.b_name+'%";';
	
	db.query(queryString,function(err,data)
	{
		console.log(data);

			res.send(data);
	});

});
app.post('/faculty_search',function(req,res)
{
	console.log(req.body);
	var queryString = 'select name,faculty_id,designation,email,contact from faculty '
	+'where name LIKE "%'+req.body.faculty_name+'%";';
	
	db.query(queryString,function(err,data)
	{
		console.log(data);

			res.send(data);
	});

});
app.post('/subHandDetails',function(req,res)
{
	console.log(req.body);
	var queryString = 'select name,subject_name from faculty f,takes_course t,subject s '
	+'where f.faculty_id=t.faculty_id and s.subject_id=t.subject_id;';
	
	db.query(queryString,function(err,data)
	{
		console.log(data);

			res.send(data);
	});

});
app.post('/putProjectdetails',function(req,res)
{
	console.log('herea');
	var insertString = 'insert into project values ("'+req.body.project_no+'","'+req.body.project_description+'","'+req.body.period+'","'
	+req.body.domain+'");';
	db.query(insertString,function(err,rows)
	{
		var faculties=req.body.faculty_id.split(',');
		faculties.forEach(function(faculty)
			{
				var istring='insert into works_project values("'+req.body.project_no+'","'+faculty+'");';

				db.query(istring,function(err)
					{
						console.log(faculty+' done');
					});
			});
		console.log('success');
		res.send('Successfully added the project into database');
	});			
});
app.post('/project_search',function(req,res)
{
	/*var queryString = 'select p.domain,p.description,p.period,f.name from project p,works_project w,faculty f where p.project_no=w.project_no'
	+' and f.faculty_id=w.faculty_id and p.domain like "%'+req.body.domain+'%" and p.description like "%'+req.body.description+
	'%" and f.name like "%'+req.body.faculty_name+'%";';
	
	db.query(queryString,function(err,data)
	{
		console.log(data);

			res.send(data);
	});*/
	db.query("select * from project p where p.domain like '%"+req.body.domain+"%' and p.description like '%"+req.body.description+"%'",
	function(err,data){
		var d= data;
		var i=0;
		//console.log(d);
		d.forEach(function(datas)
			{

				//console.log(datas.project_no);
					var quertString= "select name from works_project w,faculty f where f.faculty_id=w.faculty_id and project_no = '"+datas.project_no+"';";
					db.query(quertString,function(err,rows)
						{
							console.log(rows);
							datas.faculty=rows;
								i=i+1;
								if(i==d.length)
								{
									res.send(d);
								}
						});

					
			});
		
		});


});
app.get('/getTt',function(req,res)
	{
		//console.log(req.body);
		var searchString = 'select * from timetable order by sem,sec;';
		db.query(searchString,function(err,data)
			{
				res.send(data);
			});
	});
app.get('/show/:id',function(req,res)
	{
		res.sendFile(__dirname+'/timetables/'+req.params.id);
	});
app.listen(2020,function()
{
	console.log("listening to port 2020");
});
function formatDate(d)
{
	var day= d.substr(0,2);
	var month = d.substr(3,2);
	var year=d.substr(6,4);
	return year+'/'+month+'/'+day;
}
function sendMail()
{
	console.log('mail');
	

 
   
}