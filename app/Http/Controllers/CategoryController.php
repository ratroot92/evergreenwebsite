<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Category;

class CategoryController extends Controller
{
   public Function addCategory(Request $request){

$validator = Validator::make($request->all(), [
         
			'name'=>'required|max:25|min:3',
			'sub_cateogry'=>'required',
        ]);

        if ($validator->fails()) {
                return redirect('admin')
                            ->withErrors($validator)
                            ->withInput();
            }

$category=new Category();
$category->name 				= $request->name;
$category->sub_category 		= $request->sub_category;
$category->save();

 return redirect('/admin')->with('message','Succesfull ! Added a new category');

}



}
