<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExcludedWorkersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('excluded_workers', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('order_id')
                ->unsigned()->nullable();
            $table->foreign("order_id")
                ->references("id")
                ->on("orders")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->bigInteger('worker_id')
                ->unsigned()->nullable();
            $table->foreign("worker_id")
                ->references("id")
                ->on("users")
                ->onDelete("cascade")
                ->onUpdate("cascade");

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
        Schema::dropIfExists('excluded_workers');
    }
}
