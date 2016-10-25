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
			updateString :'INSERT INTO students values ("waste")',
			insert:function()
						{
											connection.query(this.updateString,function(err,rows)
											{
													if(err)
														throw err;
													console.log('Data received fron db\n');
													console.log(rows);
											});
						}
			,
			query:function(queryString,callMe)
			{
								connection.query(queryString,function(err,rows)
								{
										if(err)
											throw err;
										console.log('Data received fron db\n');
										callMe(rows);
										//console.log(typeof rows);
										
								});
			}
}

module.exports = connectdb;