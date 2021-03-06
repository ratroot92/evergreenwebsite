<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
$table->bigInteger('id');
$table->string('name')->nullable();
$table->mediumText('desc')->nullable();
$table->double('actual_price')->nullable();
$table->double('old_price')->nullable();
$table->string('tags')->nullable();
$table->string('category')->nullable();
$table->string('sub_category')->nullable();
$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
