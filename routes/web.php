<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('master');
})->name('master');


Route::get('/master', function () {
    return view('welcome');
})->name('homepage');


Route::get('/track_your_order', function () {
    return view('tracking');
})->name('tracking');


Route::get('/Return_Refund', function () {
    return view('returnrefund');
})->name('return_refund');



Route::get('/Contact_Page', function () {
    return view('contact');
})->name('contact');


Route::get('/admin', function () {

$items = DB::select('select * from items');
		return view('admin',compact('items'));

   
})->name('admin');

// Route::get('/admin/add_item_page', function () {
//     return view('/admin_views/add_item');
// })->name('add_item_page');

// Route::get('/admin/add_category_page', function () {
//     return view('admin/admin_views/add_category');
// })->name('add_category_page');


Route::get('/ajax', function () {
    $items = DB::select('select * from items');
		return view('ajax',compact('items'));

})->name('ajax');





Route::post('/editProduct','ItemController@editProduct')->name('editProduct');
Route::post('/admin/addCategory','CategoryController@addCategory')->name('addCategory');

//item controller 
Route::get('/itemview','ItemController@index')->name('itemview');
Route::get('/additemmodal','ItemController@add')->name('additemmodal');
Route::post('/addProduct','ItemController@addProduct')->name('addProduct');
Route::get('/edititemmodal/{id}','ItemController@edit')->name('edititemmodal');
Route::post('/updateproduct','ItemController@update')->name('updateproduct');
Route::post('/deleteProduct/{id}','ItemController@delete')->name('deleteProduct');
//category controller 
Route::get('/categoryview','CategoryController@index')->name('categoryview');
Route::get('/addcategorymodel','CategoryController@add')->name('addcategorymodel');
