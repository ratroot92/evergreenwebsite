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