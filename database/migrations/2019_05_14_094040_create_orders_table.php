<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('order_no')->unique();
            $table->string('issue')->default('');
            $table->string('address');
            $table->string('latitude');
            $table->string('longitude');
            $table->bigInteger('client_id')->nullable();
            $table->integer('country_id')->nullable();
            $table->bigInteger('worker_id')->nullable();
            $table->bigInteger('offer_id')->nullable();
            $table->string('day');
            $table->string('time');
            $table->boolean('cod')->default(false);
            $table->double('total_price');

            $table->string('attachment')
                ->default('');

            $table->integer('status')
                ->default(0);
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
        Schema::dropIfExists('orders');
    }
}
