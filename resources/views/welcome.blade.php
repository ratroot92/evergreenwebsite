@extends('master')
@section('content')
<style type="text/css" media="screen">
    .dashlist,a{
text-decoration: none !important;
color: white;
font-weight: bold;

}

.dash_list{
/* width: 100%; */

}
</style>
<div class="container-fluid">
<!-- start of main content -->





<div class="row">
<div class="col-md-12 bg-dark border border-success nav d-flex d-inline flex-row "><!-- start of dashboard -->


<a href="#div1" class="nav-link active border-success border" id="" role="tab" data-toggle="tab">Almonds</a>
<a href="#div2" class="nav-link border-success border "  role="tab" data-toggle="tab">Nuts</a>
<a href="#div3" class="nav-link border-success border"  role="tab" data-toggle="tab">Dates</a>

</div><!-- end of dash board -->


</div>
<div class="col-md-12"><!-- start of items -->
<div class="tab-content">




<div class="tab-pane active " id="div1"> <!-- first divs start -->    
<div class="conatiner-fluid"><!-- start of container -->
<div class="row ">




<div class="col-md-3 p-1 m-0"><!-- col-md-3 --> 
<div class="card p-0 m-0" >
<img src="images/image-1.jpg" class="img-thumbnail" alt="">
<div class="card-body d-flex flex-column  m-0 p-0 text-center">
<span class="font-weight-bold text-dark">Premeium Almonds </span>
<span class="d-flex flex-row mx-auto font-weight-bold text-dark"><del class="text-danger">RS-2200 </del>
<span>RS-1,800.00/KG</span>
</span>
<span class="text-center ">
<a href="#" title="" class="btn btn-sm btn-outline-success cart_btn p-2">ADD TO CART</a></span>
</div>
</div>

</div><!-- col-md-3 --> 



<div class="col-md-3 p-1 m-0"><!-- col-md-3 --> 
<div class="card p-0 m-0" >
<img src="images/image-1.jpg" class="img-thumbnail" alt="">
<div class="card-body d-flex flex-column  m-0 p-0 text-center">
<span class="font-weight-bold text-dark">Premeium Almonds </span>
<span class="d-flex flex-row mx-auto font-weight-bold text-dark"><del class="text-danger">RS-2200 </del>
<span>RS-1,800.00/KG</span>
</span>
<span class="text-center ">
<a href="#" title="" class="btn btn-sm btn-outline-success cart_btn p-2">ADD TO CART</a></span>
</div>
</div>

</div><!-- col-md-3 --> 




<div class="col-md-3 p-1 m-0"><!-- col-md-3 --> 
<div class="card p-0 m-0" >
<img src="images/image-1.jpg" class="img-thumbnail" alt="">
<div class="card-body d-flex flex-column  m-0 p-0 text-center">
<span class="font-weight-bold text-dark">Premeium Almonds </span>
<span class="d-flex flex-row mx-auto font-weight-bold text-dark"><del class="text-danger">RS-2200 </del>
<span>RS-1,800.00/KG</span>
</span>
<span class="text-center ">
<a href="#" title="" class="btn btn-sm btn-outline-success cart_btn p-2">ADD TO CART</a></span>
</div>
</div>

</div><!-- col-md-3 --> 



<div class="col-md-3 p-1 m-0"><!-- col-md-3 --> 
<div class="card p-0 m-0" >
<img src="images/image-1.jpg" class="img-thumbnail" alt="">
<div class="card-body d-flex flex-column  m-0 p-0 text-center">
<span class="font-weight-bold text-dark">Premeium Almonds </span>
<span class="d-flex flex-row mx-auto font-weight-bold text-dark"><del class="text-danger">RS-2200 </del>
<span>RS-1,800.00/KG</span>
</span>
<span class="text-center ">
<a href="#" title="" class="btn btn-sm btn-outline-success cart_btn p-2">ADD TO CART</a></span>
</div>
</div>

</div><!-- col-md-3 --> 



</div>
</div><!-- start of container -->
</div><!-- end first div-->


<div class="tab-pane  " id="div2"> <!-- 2 divs start -->    
div 2
</div><!-- end 2 div-->




<div class="tab-pane  " id="div3"> <!-- first 3 start -->    
div 3
</div><!-- end 3 div-->



</div>
    
</div><!-- end of items-->


</div>
</div>

@stop