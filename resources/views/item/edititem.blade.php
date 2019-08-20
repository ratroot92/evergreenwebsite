<!-- edit item modal -->
<!-- Modal -->
<div class="modal fade" id="edit_item_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Item ->{{$item->id}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>


      <div class="modal-body">
       <form  action="{{route('updateproduct')}}" enctype="multipart/form-data" id="edititem_form" >
 @csrf
 <div class="form-group">
<span class="font-weight-bold text-dark">Item Id:</span>
<input type="number" name="id" id="name" class="form-control form-control-sm" value="{{$item->id}}" readonly>



<div class="form-group">
<span class="font-weight-bold text-dark">Item Name:</span>
<input type="text" name="name" id="name" class="form-control form-control-sm" min="3" max="25" value="{{$item->name}}" required>
 @if($errors->has('name'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('name') }}</div>
@endif
</div>

<div class="form-group">
<span class="font-weight-bold text-dark">Item Price:</span>
<input type="number" name="price" id="price" class="form-control form-control-sm" min="1" max="100000" value="{{$item->actual_price}}" required>
@if($errors->has('price'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('price') }}</div>
@endif
</div>






<div class="form-group">
<span class="font-weight-bold text-dark">Old Price:</span>
<input type="number" name="oldprice" id="oldprice" class="form-control form-control-sm"  min="1" max="100000" value="{{$item->old_price}}" required>
@if($errors->has('oldprice'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('oldprice') }}</div>
@endif
</div>


<div class="form-group">
<span class="font-weight-bold text-dark">Item Tags</span>
<select name="tags" id="tags" class=" form-control"  >
<option value="{{$item->tags}}">{{$item->tags}}</option>
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
<select name="category" id="category" class=" form-control"  >
<option value="{{$item->category}}">{{$item->category}}</option>
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
<select name="sub_category" id="sub_category" class=" form-control" >
<option value="{{$item->sub_category}}">{{$item->sub_category}}</option>
<option value="dry fruit">dry fruit</option>
<option value="condiments">condiments</option>
<option value="dates">dates</option>

</select>
@if($errors->has('sub_category'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('sub_category') }}</div>
@endif
</div>


<div class="form-group">
<span class="font-weight-bold text-dark " >Item Description</span>
<textarea class="text-center " rows="4" cols="50" name="desc" value="{{$item->desc}}" id="desc">
{{$item->desc}}
</textarea>
</div>


<div class="form-group">
<input type="file" name="images[]" id="images[]" multiple >
@if($errors->has('images'))
 <div class=" alert alert-danger  font-weight-bold">&spades;{{ $errors->first('images') }}</div>
@endif
</div>







      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="submit" data-task="{{$item->id}}" class="btn btn-success " id="submit_btn" name="submit" id="btnSAVE" value="submit"/>
</form>
      </div>
    </div>
  </div>
</div>
