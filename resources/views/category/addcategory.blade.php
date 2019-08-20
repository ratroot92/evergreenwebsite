

<!-- Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button>
 -->
<!-- Modal -->
<div class="modal fade" id="addcategory_model" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable|modal-dialog-centered modal-sm|modal-lg|modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <form action="{{route('addCategory')}}" method="POST"  name="form2">


<div class="form-group">
<span class="text-dark font-weight-bold">Category ID:</span>
<input type="number" name="cat_id" class="form-control form-control-sm" readonly>

</div>

<div class="form-group">
<span class="text-dark font-weight-bold">Category Name:</span>
<input type="text" name="cat_name" class="form-control form-control-sm" min="3" max="25" required>
@if($errors->has('cat_name'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('cat_name') }}</div>
@endif
</div>

<div class="form-group">
<span class="text-dark font-weight-bold">SubCategory Name:</span>
<input type="text" name="cat_sub_category" min="3" max="25"  class="form-control form-control-sm" required>
@if($errors->has('cat_sub_category'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('cat_sub_category') }}</div>
@endif
</div>


<input type="submit" class="btn btn-success mt-2"  id="btnAddCategory"name="submit" value="submit">


</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>