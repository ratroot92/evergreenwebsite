<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{

 protected $fillable = ['id','name','image','desc','actual_price','old_price','tags','category','sub_category'];



public function item_has_many_images(){

return $this->hasMany('App\File', 'item_id', 'id');

}


}
