$(document).ready(function () {
 $('#msg_div').hide();




$('#additem_form').submit(function(){
event.preventDefault();


            $.ajax({
            url:$(this).attr('action'),
                type:'POST',
				 data:new FormData(this),                  
                contentType: false,
                processData: false,
   				dataType:"json",  
                success: function(data) {
$('#msg_div').show();
$('#msg_para').html("Item Has been Sucessfully saved to Database  ... ");
$('#msg_para').fadeOut(15000);	
$("#exampleModalCenter").modal('hide');
$("#exampleModalCenter").modal('toggle');
console.log(data);
var trHTML = '';
          $.each(data, function (key,items) {
             trHTML += 
                '<tr><td>' + items.id + 
                '</td><td>' + items.name + 
                '</td><td>' + items.desc + 
                '</td><td>' + items.old_price + 
                '</td><td>' + items.actual_price + 
                '</td><td>' + items.category + 
                '</td><td>' + items.sub_category + 
				  '</td><td>' + items.tags + 
                '</td></tr>';     
          });
  $('#item_table').append(trHTML);

                }
            });




});






});