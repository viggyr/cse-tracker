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
                +'href="http://localhost:2020/download/'+data.q_id+'" download></a></td><td></tr>');
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
    ).fail(function()
    {
    alert("fail");
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