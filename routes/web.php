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
    return view('admin');
})->name('admin');



Route::post('/addProduct','ItemController@addProduct')->name('addProduct');
Route::post('/admin/addCategory','CategoryController@addCategory')->name('addCategory');