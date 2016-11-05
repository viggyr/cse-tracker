var mysql      = require('mysql');
var connection;
var connectdb=
{
			dbConnect:function()
			{
				connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : 'viggymysql@96',
				  database : 'cse'
			});

			connection.connect(function(err)
							  {
									if(err)
									{
										console.log("error connecting to the sql server");
									}
									else
									{ 
										console.log("Established");
									}
			                   });
			},
			
			insert:function(updateString,callMe)
						{
											connection.query(updateString,function(err,rows)
											{
													if(err)
														throw err;
													callMe(rows);
											});
						}
			,
			query:function(queryString,callMe)
			{
								connection.query(queryString,function(err,rows)
								{
										
										console.log('Data received fron db\n');
										callMe(err,rows);
										//console.log(typeof rows);
										
								});
			}
}

module.exports = connectdb;