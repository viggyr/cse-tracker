var db = require('./db.js');
db.dbConnect();
db.query("select * from project p where p.domain like '%%' and p.description like '%%'",
	function(err,data){
		var d= data;
		var i=0;
		//console.log(d);
		d.forEach(function(datas)
			{

				//console.log(datas.project_no);
					var quertString= "select faculty_id from works_project where project_no = '"+datas.project_no+"';";
					db.query(quertString,function(err,rows)
						{
							console.log(rows);
							datas.faculty=rows;
								i=i+1;
								if(i==d.length)
								{
									console.log(d);
								}
						});

					
			});
		
		});
