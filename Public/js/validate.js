$(document).ready(function(){

	$("form[name='myform']").validate({
		rules : {
			      name: {
			      	required : true,
			        email : true
		          }
		          password :{ required : true 
		          }
		       }
		messages : {
		
	  	          name: "Please enter a valid mail-id"
		          password: "Please enter the password"
               },
      submitHandler : function(form) {
      	 alert('valid form submitted');
      	  return false;
      }         

	});
});

