<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;
use Validator;
class ItemController extends Controller
{
    public Function addProduct(Request $request){

 $validator = Validator::make($request->all(), [
           'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
			'name'=>'required|max:25|min:3',
			'price'=>'required',
			'oldprice'=>'required',
			'tags'=>'required',
			'category'=>'required',
			'sub_cateogry'=>'required',



        ]);

        if ($validator->fails()) {
                return redirect('admin')
                            ->withErrors($validator)
                            ->withInput();
            }

   if ($request->hasFile('image')) {
$item=new Item();
$item->name 		= $request->name;
$custom_file_name = time().'-'.$request->file('image')->getClientOriginalName();
$item->image 		 = $request->file('image')->storeAs('public/images',$custom_file_name);
$item->actual_price = $request->price;
$item->old_price 	= $request->oldprice;
$item->tags 		= $request->tags;
$item->category 	= $request->category;
$item->sub_category = $request->sub_category;
$item->save();
 return redirect('/admin')->with('message','Item successfully stored in Databse ');

}
else{
 return redirect('/admin')->with('message','Unsucessfull ! Please try again   ');
}






}




}
