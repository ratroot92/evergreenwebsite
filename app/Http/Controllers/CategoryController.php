<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Category;

class CategoryController extends Controller
{
   public Function addCategory(Request $request){

//  $validator = Validator::make($request->all(), [
         
// 			'cat_name'=>'required|max:25|min:3',
// 			'cat_sub_cateogry'=>'required',
// ]);

//         if ($validator->fails()) {
//                 return redirect('/admin')
//                            ->withErrors($validator)
//                            ->withInput();
//           }

// else{
$category=new Category();
$category->name= $request->cat_name;
$category->sub_category= $request->cat_sub_category;
$category->save();
return view()
$categories=Category::all();
return view('category/showcategory',compact('categories'));
}

public Function index (){
$categories=Category::all();
return view('category/showcategory',compact('categories'));
}

public Function add (){

return view('category/addcategory');
}








}
