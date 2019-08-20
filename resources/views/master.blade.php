<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>EVERGREEN</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="css/app.css">
		<meta name="csrf-token" content="{{ csrf_token() }}">






        <!-- Fonts -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- icons -->       
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- Styles -->
<link type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">
<!-- JS SCRIPT -->
<script src="js/app.js" type="text/javascript" charset="utf-8" async defer></script>



        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
#header_navs{
text-decoration:none !important;
font-size: 13px;

border-right: 1px solid white;


}
#header_social_icons{
}
.form-control{
border-radius: 0px;
}
.fa-search{
text-align: center;
padding-top: 5px;
height: 29px;
width: 30px;
color: white;
}



.img-thumbnail{
border-radius: 0px;
/* border: none; */

}
.card{
border-radius: 0px;
/* border: 0px; */
}

.cart_btn{
border-radius: 0px;
padding: 0px;
margin: 0px;
border: 2px solid yellow;
text-decoration: none;
color: black;
font-weight: bold;

}
.btn-lg{
border-radius: 0px;
}


.model_btn{
font-size: 16px;
font-weight: bold;
height: 40px;
border: 0px;
background-color: white;
}

.logo{
padding: 0px;
margin: 0px;
border: none;

}


.secondary_header{
/* background-image:  url('images/image-8.jpg');
background-size:   cover;
background-repeat: no-repeat;
object-fit: contain; */
}
          

           
        </style>
    </head>
<body>
<div class="container-fluid "><!-- start of container -->


            <!-- start of header -->
<div class="row bg-dark"><!-- start of row -->
<div class="col-md-5  my-auto"><!-- start of coloumn -->
<span class="text-white font-weight-bold" style="font-size: 12px;">DELIVERY CHARGES WOULD APPLY FOR ORDERS BELOW RS.800</span>
</div><!-- end of colomn -->


<div class="col-md-5 my-auto"><!-- start of second coloumn -->
<ul class="nav"><!-- start of navigation -->
<li><a href="{{route('homepage')}}" class="nav-link m-0 p-1 " title="" id="header_navs">Home</a></li> 
<li><a href="{{route('tracking')}}" class="nav-link m-0 p-1 " title="" id="header_navs">Track your order</a></li> 
<li><a href="{{route('return_refund')}}" class="nav-link m-0 p-1" title="" id="header_navs">Return & refunds</a></li>
<li><a href="{{route('contact')}}" class="nav-link m-0 p-1" title="" id="header_navs">Contact</a></li>
</ul><!-- end of navidation -->
</div><!-- end of second coloumn -->


<div class="col-md-2  my-auto"><!-- start of thrid coloumn-->
<a href="#" title="follow us on facebook" class="fa fa-facebook" id="header_social_icons"></a>
<a href="#" title="follow us on facebook" class="fa fa-twitter" id="header_social_icons"></a>
<a href="#" title="follow us on facebook" class="fa fa-google" id="header_social_icons"></a>
<a href="#" title="follow us on facebook" class="fa fa-google" id="header_social_icons"></a>
<div class="dropdown float-right">
<button class="btn btn-sm btn-danger dropdown-toggle" type="button" data-toggle="dropdown"> Admin
  <span class="caret"></span></button>
 <div class="dropdown-menu dropdown-menu-right">

    <div class="form-group">
      <label for="exampleDropdownFormEmail1">Admin ID</label>
      <input type="text" class="form-control" id="admin_id" placeholder="id@example.com" name="admin_id">
    </div>
    <div class="form-group">
      <label for="exampleDropdownFormPassword1">Password</label>
      <input type="password" class="form-control" id="admin_password" placeholder="Password"  name="admin_password">
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="dropdownCheck">
      <label class="form-check-label" for="dropdownCheck">
        Remember me
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>

  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">New around here? Sign up</a>
  <a class="dropdown-item" href="#">Forgot password?</a>
</div>
</div>
</div>



</div><!-- end of row -->
<!-- end of header -->
<!-- start of seondary header -->
<div class="row border border-success secondary_header" ><!-- start of row -->
<div class="col-md-2">   
<div class="rounded-circle">
<img src="images/image-5.jpg" alt="Logo" class="img-thumbnail logo">
</div>              
</div>
<div class="col-md-6 d-flex flex-row my-auto ">
<input type="search" class="form-control form-control-sm " placeholder="search..." name=""><i class="fa fa-search border border-success  bg-dark"></i>                  
</div>

<div class="col-md-4  d-flex flex-row my-auto ">
<a type="button" class=" btn btn-light model_btn" data-toggle="modal" data-target=".bd-example-modal-lg" title="" >LOGIN</a>

<a href="#" class="nav-link text-dark" title="" style="font-size: 16px;">CART / Rs0.0</a>
<span class="fa fa-cart-plus" style="font-size: 40px"></span>
    
</div>
</div><!-- end of row -->
</div><!-- end of container-->
@yield('content')

<!-- Large modal -->

<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content container-fluid">
<form>
<div class="row pb-2 pt-2 " style="background-color: #e9ecef;">
<div class="col-md-12 text-center">
<button type="button" class="btn  btn-primary font-weight-bold  "><i class="fa fa-facebook mr-2 mt-2" style="font-size: 35px;"></i>LOG WITH FACEBOOK</button>
</div>
</div>

<div class="conatiner">

<div class="row border border-success">
<div class="col-md-6 border border-success">
<p class="text-muted font-weight-bold" style="font-size: 20px;">LOGIN</p>
<div class="form-group">
<span class="font-weight-bold text-dark">Username or email address:</span>
<input type="email" name="email" id="email" class="form-control" value="" required="">
</div>

<div class="form-group">
<span class="font-weight-bold text-dark">Password:</span>
<input type="password" name="password" id="password" class="form-control" value="" required>
</div>


<div class="form-group">
<input type="checkbox" name="remember_me" value="Remember me"/><span class="text-dark font-weight-bold ml-2">Remeber me</span>

</div>




<div class="form-group">
<input type="submit" class="btn btn-lg btn-success text-white font-weight-bold" value="LOG IN">

</div>

<a href="#" class="nav-link text-primary font-weight-bold p-0 m-0" style="font-size:17px;">Lost Your Password ?</a>




</div>

<div class="col-md-6 border border-success">
<p class="text-muted font-weight-bold" style="font-size: 20px;">REGISTER NOW</p>
<div class="form-group">
<span class="font-weight-bold text-dark"> Email address:</span>
<input type="email" name="r_email" id="r_email" class="form-control" value="" required="">
</div>

<p style="font-size:16px;font-weight:bold;">A pasword will be sent to your email address.</p>
<span>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#" title="">privacy policy</a>.</span>






<div class="form-group">
<input type="submit" class="btn btn-lg btn-success text-white font-weight-bold" value="REGISTER">

</div>





</div>



 </div></div>



</form>
    </div>
  </div>
</div>


<footer>
    <script>
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
</script>
</footer>
</body>
</html>
