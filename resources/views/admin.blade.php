@extends('master')
@section('content')
<div class="container-fluid">

<div class="row ">
<div class="col-md-2 bg-dark"><!-- start of dashboard -->
<ul class="nav d-flex flex-column ">
<li class=""><a href="#div1" class="nav-link text-white font-weight-bold active" data-toggle="tab" >Dashboard</a>
</li>
<li><a href="#div2" class="nav-link text-white font-weight-bold" data-toggle="tab" >Items</a></li>

<li><a href="#div3" class="nav-link text-white font-weight-bold" data-toggle="tab" >Categories</a></li>

<li><a href="#div4" class="nav-link text-white font-weight-bold" data-toggle="tab" >View Items</a></li>


</ul>

</div><!-- end of dashboard -->

<div class="col-md-10"><!-- start of tabs -->

<!-- start of alert -->
@if(session('message'))


<div class="row">
<div class="col-md-12 text-danger font-weight-bold text-white alert alert-danger text-center" style="font-size: 25px;">
     {{session('message')}}
</div>
</div>
@endif
<!-- end of alert -->



<div class="tab-content">
<!-- ajx message displayed here -->
<div class="row">
<div class="col-md-12  text-center alert alert-success" id="msg_div">
<p id="msg_para" class="font-weight-bold text-dark"></p>
</div>
</div>
<!-- end of ajax message displayed here -->


<div class="tab-pane " id="div1"><!-- start of div1-->
div1
</div><!-- end of div1 -->



<div class="tab-pane " id="div2"><!-- start of div2-->

<div id="renderitems" class="row">


</div>
<div id="appendmodal"></div>

</div><!-- end of div2 -->

<div class="tab-pane  active" id="div3"><!-- start of div3-->

<div id="rendercategory" class="row">
</div>

<div id="appendmodel_category"></div>
</div><!-- end of div3 -->






<div class="tab-pane " id="div4"><!-- start of div4-->

<div class="conatiner-fluid">







</div>
</div><!-- end of div4 -->






</div><!-- end of tab content -->
</div><!-- end of col-md- 10-->








</div><!-- end of row -->
</div><!-- end of page -->



<script type="text/javascript">
$(document).ready(function(){
$('#msg_div').hide();

//end

//render view
$.get('{{URL::to("itemview")}}',function(data){
$('#renderitems').empty().append(data);
});//end


//open modal on add item button
$('#renderitems').on('click','#btn_additem',function(){
$.get('{{URL::to("additemmodal")}}',function(data){
$('#appendmodal').empty().append(data);
$('#model_additem').modal('show');
//alert("hi");
});

});//end 


// start of insert addproduct 
$('#appendmodal').on('submit','#addform',function(e){
e.preventDefault();


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
$('#model_additem').modal('hide');
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




}); //end  of insert addproduct 


// start of call edit modal
$('#renderitems').on('click','.btnManage',function(){
var id=$(this).data('task');
$.get('{{URL::to("edititemmodal")}}/'+id,function(data){
$('#appendmodal').empty().append(data);
$('#edit_item_modal').modal('show');
});

});// end of call edit modal


// start of update record 
$('#appendmodal').on('submit','#edititem_form',function(e){
e.preventDefault();
var formdata=new FormData(this);


 $.ajax({
            url:$(this).attr('action'),
                type:'POST',
				 data:new FormData(this),                  
                contentType: false,
                processData: false,
   				//dataType:"json",  
                success: function(data) {
			$('#renderitems').empty().append(data);
			$('#edit_item_modal').modal('hide');
                }
            });


});
//end of delete record 
$('#renderitems').on('click','.btnDelete',function(e){
var id=$(this).data('task');
$.post('{{URL::to("deleteProduct")}}/'+id,function(data){
$('#renderitems').empty().append(data);
});
});//end of delete record


//codes for category 
//show add category view 
$.get('{{URL::to("categoryview")}}',function(data){
$('#rendercategory').empty().append(data);


});//end of show category view 

//start of modal add category trigger 
$('#rendercategory').on('click','#btn_addcategory',function(){
$.get('{{URL::to("addcategorymodel")}}',function(data){
$('#appendmodel_category').empty().append(data);
$('#addcategory_model').modal('show');
});
});//end of modal add category trigger 


//start of form submission to add category 
$('#rendercategory').on('submit','#addCategoryForm',function(e){
e.preventDefault();
 var formData = $(this).serialize();
$.ajax({
            url:$(this).attr('action'),
                type:'POST',
				 data:formData,                  
               // contentType: false,
               // processData: false,
   				//dataType:"json",  
                success: function(data) {
			$('#rendercategory').empty().append(data);
			console.log(data);
                },
			error:function(data){
			console.log(error);
				}
            });
});//end of form submission to add category 



});//end of  doucument load

</script>


@stop

