<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTrackingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_tracking', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('status')
                ->default(0);
            $table->string('note')
                ->default('');

            $table->bigInteger('order_id')
                ->unsigned()->nullable();
            $table->foreign("order_id")
                ->references("id")
                ->on("orders")
                ->onDelete("cascade");

            $table->bigInteger('user_id')
                ->unsigned()->nullable();
            $table->foreign("user_id")
                ->references("id")
                ->on("users")
                ->onDelete("set null");

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
        Schema::dropIfExists('order_trackings');
    }
}
