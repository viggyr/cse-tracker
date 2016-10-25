var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'viggymysql@96',
  database : 'student'
});

connection.connect(function(err)
	{
		if(err)
		{
			console.log("error");
		}
		else
		{
			console.log("Established");
		}
	});

var querystring = "SELECT * from students where name='cklcmka'";
var updateString = 'INSERT INTO students values ("varun")';
connection.query(querystring,function(err,rows)
	{
		if(err)
			throw err;
		console.log('Data received fron db\n');
		console.log(typeof rows);
		console.log(rows[0]);
	});

// query
/*connection.query(updateString,function(err,rows)
	{
		if(err)
			throw err;
		console.log('INSERT success\n');
		console.log(rows);
	});
connection.query(querystring,function(err,rows)
	{
		if(err)
			throw err;
		console.log('Data received fron db\n');
		console.log(rows);
	});*/

