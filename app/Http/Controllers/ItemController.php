<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;
use App\File;
use Validator;
use DB;
class ItemController extends Controller
{


public Function index(){
$items=Item::all();
return view('item/showitem',compact('items'));

}

public Function add(){

return view('item/additem');

}




public Function edit($id){
$item=Item::findOrFail($id);
return view('item/edititem',compact('item'));

}


public function addProduct(Request $request){


$last_item= Item::orderBy('created_at','desc')->first();
       if ($last_item!=null)
       {
           $last_item_id              = $last_item->id+1;
       }
       else
       {
           $last_item_id              = 1;
       }

 	 $input= $request->all();
        $this->validate($request, [
            // 'uploads' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
       if($request->hasFile('images'))
   {
		   foreach($request->images as $image){
			$extension=$image->getClientOriginalExtension();
			$filename=time()."_.".$extension;
			//$filename = $upload->getClientOriginalName();
            $path=$image->move(public_path('Item/Images'),$filename);
		   
			$file=new File;
			$file->item_id=$last_item_id;
			$file->description=$request->input('desc');
 			$file->src=$path;
			$file->save();
		   }
          
       }
	    $item= new Item;
       $item->id= $last_item_id;
       $item->name= $input['name'];
      	$item->desc= $request->input('desc');
	   $item->actual_price= $input['price'];
	   $item->old_price = $input['oldprice'];
       $item->tags= $input['tags'];
       $item->category= $input['category'];
	   $item->sub_category= $input['sub_category'];
       $item->save();
      $items= Item::orderBy('created_at','desc')->first();
     // return response()->json($item);
   return response()->json(array('items' => $items));
}//end of add item function 


public Function update (Request $request){

DB::table('items')
                ->where('id', $request->input('id'))
                ->update(['name' =>$request->input('name'),
						'desc' =>$request->input('desc'),
						'actual_price' =>$request->input('price'),
						'old_price' =>$request->input('oldprice'),
						'tags' =>$request->input('tags'),
						'category' =>$request->input('category'),
						'sub_category' =>$request->input('sub_category')]);
$items=Item::all();
return view('item/showitem',compact('items'));
}


public Function delete($id){
//$id=$request->id;
Item::where('id',$id)->delete();
$items=Item::all();
return view('item/showitem',compact('items'));


}//end of delete function 


}//end of controller 
