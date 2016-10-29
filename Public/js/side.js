$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function() {                        
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
    });
    $('#search').submit(function(event)
    {
    	
    });
});
function submit_search()
{

    event.preventDefault();
        var formData= $('#search').serialize();
        
        
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/search',
                data: formData ,
                dataType:'json'

                
                }).done(function(data)
                {
                   
                    addRows(data);
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });

}
function addRows(datas)
{
    
   if(datas.length>0)
    {

$('#result').empty();
        datas.forEach(function(data)
        {
            if(data.copies>0)
                data.available='Yes';
            else
                data.available='No';

            var color;

            if(data.available==='Yes')
            {
                 color = 'info';
            }
            else
            color= 'danger';
            
           
            $('#result').append('<tr class='+color+'><td>'+data.title+'</td><td>'+data.author_name+'</td><td>'+
                data.subject_name+'</td><td>'+data.available+'</td></tr>');
        });

   
    }
    else 
    {
        console.log("here");
       $('#result').empty();
        $('#result').html('<div class="text-center"><h3>Sorry No Such Book Available in The Library</h3></div>');
    }
 
}
function goHome()
{
    var home = '<div style="overflow:hidden" id="content"><h2>Welcome</h2><br><p> The B.E. in Computer Science and Engineering programme was started in 1984. The programme is designed to create globally competent manpower for the information and communication technology (ICT) industry. At the same time, it is also designed to prepare the student for post graduate education in the best universities across the globe. These twin objectives are accomplished by including an optimal mix of fundamental theory subjects and practical, current and industry relevant subjects in the scheme of study.</p><p> The Department has state-of-the-art infrastructure and computing equipment supported by high speed Ethernet and wireless networks. Various student organisations like CSI Chapter, IEEE Student Chapter are active throughout the year.</p>'
             +'<p>The Department has a comprehensive curriculum on topics related to all aspects of Computer Hardware and Software with an emphasis on practical learning. The course structure is in line with latest advances in technology which equip the students with the latest developments in Computer Science and Engineering.</p>'
             +'<br><div> <img src="images/dept_img.JPG" style="width:400px;height:200px;margin-left:300px"></img></div></br></div>';
    $('#page-wrapper').empty();
    $('#page-wrapper').append(home);
}
function loadBooks()
{
    $('#page-wrapper').empty();
var $books = $('#content').html();
console.log($books);
     
    $('#page-wrapper').append($books);
}
function RegisterForm()
{
 event.preventDefault();
    var formData= $('#register').serialize();
    $.ajax({
                type: 'POST',
                url: 'http://localhost:2020/registration',
                data: formData ,
                dataType:'json'

                
                }).done(function(data){
                     console.log("redirect");  
                     window.location="http://localhost:2020/home";
                    })    
}

