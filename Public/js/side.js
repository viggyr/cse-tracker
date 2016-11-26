$(function(){
 goHome();
 
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function() {                        
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
    });
    
});
function submit_search(event)
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
function addIssue(datas)
{
    if(datas.length>0)
    {
 $('#result').empty();
        datas.forEach(function(data)
            {
                var color='info';
                var email='';
                if(Date.parse(data.return_date)<=Date.now())
                {
                    color='danger';

                    email ='<a target="_blank" href="mailto:coolrv.r@gmail.com?subject=RVCE CSE LIBRARY&body=Your%20Book%20Issue%20Titled%20'+data.title+'%20has%20crossed%20deadline.%20Please%20Return%20Asap%20to%20Avoid%20fine">send</a>';
                }
                console.log(email);

                
                var issue_date=new Date(data.issue_date).getDate()+'/'+new Date(data.issue_date).getMonth()+'/'+new Date(data.issue_date).getFullYear();
                var return_date=new Date(data.return_date).getDate()+'/'+new Date(data.return_date).getMonth()+'/'+new Date(data.return_date).getFullYear();
                $('#result').append('<tr class='+color+'><td>'+data.title+'</td><td>'+data.usn+'</td><td>'+
                issue_date+'</td><td>'+return_date+'</td><td>'+email+'</td></tr>');
            });
    }
    else
    {
         $('#result').empty();
        $('#result').html('<div class="text-center"><h3>Sorry Usn you have entered is invalid</h3></div>');
    }
}
function addProject(datas)
{
    if(datas.length>0)
    {
        $('#result').empty();
        datas.forEach(function(data)
            {
               
                var fac="";
                var i=1;
                data.faculty.forEach(function(datas)
                    {
                            fac=fac+"<td>"+datas.name+"</td>";
                            i=i+1;
                    });
                while(i<=3)
                {
                     fac=fac+"<td> </td>";
                            i=i+1;
                }

               
                $('#result').append('<tr class="info"><td>'+data.domain+'</td><td>'+data.description+
                    '</td><td>'+data.period+fac+'</tr>');
            });
    }
    else
    {
         $('#result').empty();
        $('#result').html('<div class="text-center"><h3>No Matching Project found. Check the Details</h3></div>');
    }
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
function search_papers()
{
event.preventDefault();
        var formData= $('#qpapers').serialize();
        
        
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/sendQDetails',
                data: formData ,
                dataType:'json'

                
                }).done(function(data)
                {
                   
                    addQRows(data);
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });
}
function question_papers()
{
    console.log("question_papers");
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/question_papers',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    alert("fail");
    });    


}
function goHome()
{
 $.ajax({
    type:'GET',
    url: 'http://localhost:2020/home',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    alert("fail");
    });    

}
function loadBooks()
{
    /*$('#page-wrapper').empty();
var $books = $('#content').html();
console.log($books);
     
    $('#page-wrapper').append($books);*/

    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/books',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    alert("fail");
    });
}
function downloadQ(q_id)
{

$.ajax({
    type:'GET',
    url: 'http://localhost:2020/download/'+q_id,
    dataType: 'html'
}).done(function(data)
{
    
    }).fail(function()
    {
    alert("fail");
    });
}
function addQRows(datas)
{
    if(datas.length>0)
    {

$('#resultQ').empty();
        datas.forEach(function(data)
        {           
           
            $('#resultQ').append('<tr><td>'+data.subject_name+'</td><td>'+data.year+'</td><td><a class="glyphicon glyphicon-download-alt"'
                +'href="http://localhost:2020/download/'+data.q_id+'" download></a></td></tr>');
        });

   
    }
    else 
    {
        console.log("here");
       $('#resultQ').empty();
        $('#resultQ').html('<div class="text-center"><h3>Incorrect subject name</h3></div>');
    }

}
function requestInsertQ()
{
$.ajax({
    type:'GET',
    url: 'http://localhost:2020/insertQpage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function(xsr,status)
    {
    showModal();
    });     
}
function sendPaper()
{
    event.preventDefault();
    var formData = new FormData($('#insertQPaper')[0]);
//alert(formData);

    $.ajax({
        url: 'http://localhost:2020/uploads',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false
    }).done(function(data)
    {
       
        $('#page-wrapper').empty();
        $('#page-wrapper').append('<h2>'+data+'</h2>');
    }).fail(function()
    {
        
        $('#page-wrapper').empty();
        $('#page-wrapper').append('<div><h2>Failure</h2></div>');
    });
   // return false;
}
function getIssuePage()
{
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getIssuePage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    showModal();
    });    

}

function sendIssueDetails()
{
    event.preventDefault();
        var formData= $('#issue').serialize();

         $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/insertIssue',
                data: formData

                
                }).done(function(data)
                {
                   
                    $('#page-wrapper').empty();
                    $('#page-wrapper').append('<h2>'+data+'</h2>');
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });

}
function sendReturnDetails()
{
    event.preventDefault();
        var formData= $('#return').serialize();

         $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/insertReturn',
                data: formData

                
                }).done(function(data)
                {
                   
                    $('#page-wrapper').empty();
                    $('#page-wrapper').append('<h2>'+data+'</h2>');
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });

}
function getIssueDetailsPage()
{
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getIssueDetailsPage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    alert("fail");
    });    

}
function getIssueDetails(event)
{

    event.preventDefault();
        var formData= $('#issue_search').serialize();
        
        
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/issue_search',
                data: formData ,
                dataType:'json'

                
                }).done(function(data)
                {
                   //console.log(data[0].email);
                    addIssue(data);
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });

}

function getProjectpage()
{
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getProjectpage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function(xsr,status)
    {
        showModal();
    
    });    

}

function putProjectDetails(event)
{

    event.preventDefault();
        var formData= $('#projects').serialize();
        
        
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/putProjectdetails',
                data: formData

                
                }).done(function(data)
                {
                   //console.log(data[0].email);
                    //addIssue(data);
                     $('#page-wrapper').empty();
                    $('#page-wrapper').append('<h2>'+data+'</h2>');
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });

}

function getProjectDetailsPage()
{
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getProjectDetailsPage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    alert("fail");
    });
}
function getProjectDetails(event)
{
event.preventDefault();
        var formData= $('#project_search').serialize();
        
        console.log(formData);
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/project_search',
                data: formData ,
                dataType:'json'

                
                }).done(function(data)
                {
                   //console.log(data[0].email);
                  
                    addProject(data);
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });    
}
function getFacultyPage()
{
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getFacultyPage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    showModal()
    });    

}
function getTtPage()
{
     $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getTtPage',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    console.log('err receiving from to server');
    });    
}

function addTt(data)
{
     $.ajax(
            {
                type: 'GET',
                url: 'http://localhost:2020/getTt',
                dataType:'json'

                
                }).done(function(data)
                {
                   
                    display(data);
                }).fail(function()
                {
                    console.log("failed 1 to fetch from server");
            });
}
function display(data)
{
    data.forEach(function(d)
        {
         $('#result').append('<tr><td>'+d.sem+'</td><td>'+d.sec+'</td><td><a href="#" onclick="show('+d.q_id+')">Open</a></td></tr>');   
        });
}
function showModal()
{
     
  $('#authModal').modal('show');
}
function show(id)
{
    console.log(id);
    $('#imagepreview').attr('src', 'timetables/'+id+'.jpg'); // here asign the image to the modal when the user click the enlarge link
  $('#imagemodal').modal('show');
}
function loadFaculty()
{
     $.ajax({
    type:'GET',
    url: 'http://localhost:2020/loadFaculty',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    console.log('err receiving from to server');
    });  
}
function getFacultyDetails(event)
{
 event.preventDefault();
        var formData= $('#project_search').serialize();
        
        console.log(formData);
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/faculty_search',
                data: formData ,
                dataType:'json'

                
                }).done(function(data)
                {
                   //console.log(data[0].email);
                  
                    addFaculty(data);
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });    
}
function addFaculty(datas)
{

if(datas.length>0)
    {

$('#result').empty();
        datas.forEach(function(data)
        {
           
            $('#result').append('<tr class="info"><td>'+data.name+'</td><td>'+data.faculty_id+'</td><td>'+
                data.designation+'</td><td>'+data.email+'</td><td>'+data.contact+'</td></tr>');
        });

   
    }
    else 
    {
        console.log("here");
       $('#result').empty();
        $('#result').html('<div class="text-center"><h3>Not Found</h3></div>');
    }
 

}
function getSubjectHandlesPage()
{
    $.ajax({
    type:'GET',
    url: 'http://localhost:2020/getSubHand',
    dataType: 'html'
}).done(function(html)
{
    $('#page-wrapper').empty();
    $('#page-wrapper').append($(html));
}
    ).fail(function()
    {
    console.log('err receiving from to server');
    }); 
}
function getSubHandDetails(event)
{
    event.preventDefault();
        var formData= $('#project_search').serialize();
        
        console.log(formData);
            $.ajax(
            {
                type: 'POST',
                url: 'http://localhost:2020/subHandDetails',
                data: formData ,
                dataType:'json'

                
                }).done(function(data)
                {
                   //console.log(data[0].email);
                  
                    addSubHand(data);
                }).fail(function()
                {
                    console.log("failed to fetch from server");
            });    
}
function addSubHand(datas)
{

if(datas.length>0)
    {

$('#result').empty();
        datas.forEach(function(data)
        {
           
            $('#result').append('<tr class="info"><td>'+data.name+'</td><td>'+data.subject_name+'</td></tr>');
        });

   
    }
    else 
    {
        console.log("here");
       $('#result').empty();
        $('#result').html('<div class="text-center"><h3>Not Found</h3></div>');
    }
 

}