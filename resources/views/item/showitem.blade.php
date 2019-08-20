<style type="text/css" media="screen">
	button{
border:none;
background-color:white;
}
</style>
<div class="col-md-12 p-0 m-0">
 <div class="card  ">
  <div class="card-header bg-primary">
<span class="text-white font-weight-bold float-left">  All Items</span>

<span class="font-weight-bold text-dark float-right"><button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter" id="btn_additem">Add Item</button> </span>
  </div>
  <div class="card-body p-0 m-0" style="height: 400px;overflow: scroll;">
  <table class="table border border-dark" id="item_table" style="font-size:11px;">
                                        <thead class="thead-dark">
                                          <tr>
<td scope="col" class="text-dark font-weight-bold">Item ID</td>
<td scope="col" class="text-dark font-weight-bold">Name</td>
<td scope="col" class="text-dark font-weight-bold">Description</td>
<td scope="col" class="text-dark font-weight-bold">OldPrice</td>
<td scope="col" class="text-dark font-weight-bold">NewPrice</td>
<td scope="col" class="text-dark font-weight-bold">Category</td>
<td scope="col" class="text-dark font-weight-bold">Sub-category</td>
<td scope="col" class="text-dark font-weight-bold">Tags</td>
											<td scope="col">Operations</td>
 										
                                          </tr>
                                        </thead>
                                        <tbody>
                                        @foreach ($items as $a)


<tr>
<td scope="row" class="m-0 p-0 text-center" >{{$a->id}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->name}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->desc}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->old_price}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->actual_price}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->category}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->sub_category}}</td>
<td scope="row" class="m-0 p-0 text-center">{{$a->tags}}</td>
<td scope="row" class="m-0 p-0 text-center"> 
<button type="button"  class="edit btnManage" data-task="{{$a->id}}" title="Edit" data-toggle="tooltip">
<i class="material-icons">&#xE873;</i>
</button>
<button type="button"  class="edit btnDelete" data-task="{{$a->id}}" title="Delete" data-toggle="tooltip">
<i class="material-icons">&#xE872;</i>
</button>
</td>








                                          </tr>
                                         @endforeach

                                        </tbody>
                                      </table>
 


  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>

</div>

