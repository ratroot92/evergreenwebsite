@extends('master')


@section('content')


<div class="col-md-12">
<div class="row ">
<div class="col-md-12 bg-dark ">
<span class="text-dark font-weight-bold">ALL ITEMS </span>
<span class="pull-right"><span class="text-white font-weight-bold">Add New Item</span><i class="fas fa-plus-square text-white"></i></span>
</div>

<!-- strat of second row -->
<div class="row bg- ">
<div class="col-md-12 ">
 <table class="table table-responsive border border-danger" >
                                        <thead class="thead-dark">
                                          <tr>
                                            <th scope="col">Item ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">OldPrice</th>
                                            <th scope="col">NewPrice</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Sub-category</th>
                                            <th scope="col">Tags</th>
 											 <th scope="col">Image</th>
 											<th scope="col">Operations</th>


                                          </tr>
                                        </thead>
                                        <tbody>
                                        @foreach ($items as $a)


                                            <tr>
                                            <th scope="row">{{$a->id}}</th>
                                            <th scope="row">{{$a->name}}</th>
                                            <th scope="row">{{$a->old_price}}</th>
                                            <th scope="row">{{$a->actual_price}}</th>
                                            <th scope="row">{{$a->category}}</th>
                                            <th scope="row">{{$a->sub_category}}</th>
                                            <th scope="row">{{$a->tags}}</th>
  											 <th scope="row"><img class="img-fluid" src="{{$a->image}}" width="100" height="100" alt="" ></th>
 									<th scope="row"><button type="button" id="edit" class="btn btn-sm btn-light">Edit</button>
<button type="button" id="edit" class="btn btn-sm btn-light">Update</button>
<button type="button" id="delete" class="btn btn-sm btn-light">Delete</button></th>








                                          </tr>
                                         @endforeach

                                        </tbody>
                                      </table>

</div>
</div>
<!-- end of second row -->
</div>

</div>



@endsection