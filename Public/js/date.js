function date_details()
{	
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd;
} 
if(mm<10) {
    mm='0'+mm;
} 
today = dd+'/'+mm+'/'+yyyy;
document.getElementById("issuedate").value = today;
}

function return_detail()
{
	var return_date = new Date();
	var daystoadd = 7;
    return_date.setDate(return_date.getDate() + daystoadd);
 var dd2 = return_date.getDate();
var mm2 = return_date.getMonth()+1; //January is 0!
var yyyy2 = return_date.getFullYear();
if(dd2<10) {
    dd2='0'+dd2;
} 

if(mm2<10) {
    mm2='0'+mm2;
} 

return_date = dd2+'/'+mm2+'/'+yyyy2;
document.getElementById("returndate").value=return_date;
}
