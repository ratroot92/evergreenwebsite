<div class="conatiner-fluid">
<div class="row">
<div class="col-md-12">
<button type="button" class="btn btn-dark" id="btn3">ADD CATEGORIES<span class="caret text-white"></span></button>
</div>
</div>


<div class="row" id="hideable_div_3">
<div class="col-md-6">


<form action="{{route('addCategory')}}" method="POST"  name="form2">


<div class="form-group">
<span class="text-dark font-weight-bold">Category ID:</span>
<input type="number" name="cat_id" class="form-control form-control-sm" readonly>

</div>

<div class="form-group">
<span class="text-dark font-weight-bold">Category Name:</span>
<input type="text" name="cat_name" class="form-control form-control-sm" required>
@if($errors->has('cat_name'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('cat_name') }}</div>
@endif
</div>

<div class="form-group">
<span class="text-dark font-weight-bold">SubCategory Name:</span>
<input type="text" name="cat_sub_category" class="form-control form-control-sm" required>
@if($errors->has('cat_sub_category'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('cat_sub_category') }}</div>
@endif
</div>


<input type="submit" class="btn btn-success mt-2" name="submit" value="submit">
<input type="hidden" name="_token" value="{{ csrf_token() }}">

</form>


</div>

</div>
</div>