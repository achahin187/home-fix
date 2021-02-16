<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->bigIncrements('con_id');
            $table->bigInteger('user_one')
                ->unsigned()->nullable();
            $table->foreign("user_one")
                ->references("id")
                ->on("users")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->bigInteger('user_two')
                ->unsigned()->nullable();
            $table->foreign("user_two")
                ->references("id")
                ->on("users")
                ->onDelete("cascade")
                ->onUpdate("cascade");


            $table->bigInteger('order_id')
                ->unsigned()->nullable();
            $table->foreign("order_id")
                ->references("id")
                ->on("orders")
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
        Schema::dropIfExists('conversations');
    }
}
