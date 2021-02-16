<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_services', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('order_id')
                ->unsigned()->nullable();
            $table->foreign("order_id")
                ->references("id")
                ->on("orders")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->bigInteger('service_id')
                ->unsigned()->nullable();
            $table->foreign("service_id")
                ->references("id")
                ->on("services")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->double('quantity');
            $table->double('price')->default(0);
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
        Schema::dropIfExists('order_services');
    }
}
