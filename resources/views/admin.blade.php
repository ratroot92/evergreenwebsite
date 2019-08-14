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

<div class="tab-pane active" id="div1"><!-- start of div1-->
div1
</div><!-- end of div1 -->



<div class="tab-pane" id="div2"><!-- start of div2-->
<div class="container-fluid ">
<div class="row bg-dark">
<div class="col-md-12  p-1">
<button type="button" class="btn btn-outline-success " id="btn1">Add Item<span class="caret  text-white"></span></button>
</div>	
</div>


<div class="row border border-warning" id="hideable_div_1">

<div class="col-md-6">




<form method="post" action="{{route('addProduct')}}" enctype="multipart/form-data" name="form1">
<div class="form-group">
<span class="font-weight-bold text-dark">Item Id:</span>
<input type="number" name="id" class="form-control form-control-sm" readonly>
</div>


<div class="form-group">
<span class="font-weight-bold text-dark">Item Name:</span>
<input type="text" name="name" class="form-control form-control-sm" required>
 @if($errors->has('name'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('name') }}</div>
@endif
</div>

<div class="form-group">
<span class="font-weight-bold text-dark">Item Price:</span>
<input type="number" name="price" class="form-control form-control-sm" required>
@if($errors->has('price'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('price') }}</div>
@endif
</div>






<div class="form-group">
<span class="font-weight-bold text-dark">Old Price:</span>
<input type="number" name="oldprice" class="form-control form-control-sm" required>
@if($errors->has('oldprice'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('oldprice') }}</div>
@endif
</div>


<div class="form-group">
<span class="font-weight-bold text-dark">Item Tags</span>
<select name="tags" class="js-example-basic-multiple js-states form-control"  >
<option value="dry fruit">dry fruit</option>
<option value="condiments">condiments</option>
<option value="dates">dates</option>

</select>
@if($errors->has('tags'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('tags') }}</div>
@endif
</div>


<div class="form-group">
<span class="font-weight-bold text-dark">Item Category</span>
<select name="category" class="js-example-basic-multiple js-states form-control"  >
<option value="dry fruit">dry fruit</option>
<option value="condiments">condiments</option>
<option value="dates">dates</option>

</select>
@if($errors->has('category'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('category') }}</div>
@endif
</div>


<div class="form-group">
<span class="font-weight-bold text-dark">Item Sub Category</span>
<select name="sub_category" class="js-example-basic-multiple js-states form-control" >
<option value="dry fruit">dry fruit</option>
<option value="condiments">condiments</option>
<option value="dates">dates</option>

</select>
@if($errors->has('sub_category'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('sub_category') }}</div>
@endif
</div>



<div class="form-group">
<input type="file" name="image">
@if($errors->has('image'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('image') }}</div>
@endif
</div>



<!-- 
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
  </div>
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile01" name="img_file"
      aria-describedby="inputGroupFileAddon01">
    <label class="custom-file-label" for="inputGroupFile01">Choose image file for item </label>
  </div>
</div> -->


<input type="submit" class="btn btn-success mt-3" name="submit" value="submit" >
<input type="hidden" name="_token" value="{{ csrf_token() }}">

</form>


</div>

</div>

</div>
</div><!-- end of div2 -->

<div class="tab-pane " id="div3"><!-- start of div3-->
<div class="conatiner-fluid">
<div class="row">
<div class="col-md-12">
<button type="button" class="btn btn-dark" id="btn3">ADD CATEGORIES<span class="caret text-white"></span></button>
</div>
</div>


<div class="row" id="hideable_div_3">
<div class="col-md-6">
<form action="{{route('addCategory')}}" method="post" enctype="multipart/form-data" name="form2">


<div class="form-group">
<span class="text-dark font-weight-bold">Category ID:</span>
<input type="number" name="id" class="form-control form-control-sm" readonly>
@if($errors->has('id'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('id') }}</div>
@endif
</div>

<div class="form-group">
<span class="text-dark font-weight-bold">Category Name:</span>
<input type="text" name="name" class="form-control form-control-sm" required>
@if($errors->has('name'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('name') }}</div>
@endif
</div>

<div class="form-group">
<span class="text-dark font-weight-bold">SubCategory Name:</span>
<input type="text" name="sub_category" class="form-control form-control-sm" required>
@if($errors->has('sub_category'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('sub_category') }}</div>
@endif
</div>


<input type="submit" class="btn btn-success mt-2" name="submit" value="submit">
<input type="hidden" name="_token" value="{{ csrf_token() }}">

</form>
</div>

</div>
</div>
</div><!-- end of div3 -->

</div><!-- end of tab content -->





</div>
</div><!-- end of tabs -->
</div>
</div>
<script type="text/javascript">



 btn1.addEventListener('click',function(){
var div_1 =document.getElementById("hideable_div_1");
if (div_1.style.display === "none") {
div_1.style.display = "block";
}
 else {
 div_1.style.display = "none";}
  });



btn3.addEventListener('click',function(){
var div_3 =document.getElementById("hideable_div_3");
if (div_3.style.display === "none") {
div_3.style.display = "block";
}
 else {
 div_3.style.display = "none";}
  });




</script>
@stop

