
@extends('master')
@section('content')
<!-- start of main content -->
<div class="container-fluid">
<div class="row pb-2 pt-2 " style="background-color: #e9ecef;">

<div class="col-md-12 text-center">
<button type="button" class="btn  btn-primary font-weight-bold  "><i class="fa fa-facebook mr-2 mt-2" style="font-size: 35px;"></i>LOG WITH FACEBOOK</button>
</div>
</div>


<div class="row"><!-- start of row 2 -->
<div class="col-md-12 p-2">
<p class="text-dark font-weight-bold">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
<form>
<div class="row">
<div class="col-md-6">

<span class="text-dark font-weight-bold">Order ID</span>
<input type="text" class="form-control "placeholder="Found in your order confirmation email." name="order_id" required>

<a href="#" class=" btn btn-warning mt-2 text-white font-weight-bold" title="">TRACK</a>


</div>
<div class="col-md-6">


<span class="text-dark font-weight-bold">Billing email</span>
<input type="text" class="form-control "placeholder="Email you used during checkout." name="order_id" required="">


</div>
</div>


</form>


</div>
</div><!-- end of row 2-->
</div>
@stop


