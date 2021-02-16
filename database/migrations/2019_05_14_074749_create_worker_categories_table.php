<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkerCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('worker_category', function (Blueprint $table) {
            $table->bigInteger('category_id')
                ->unsigned()->nullable();
            $table->foreign("category_id")
                ->references("id")
                ->on("categories")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->bigInteger('user_id')
                ->unsigned()->nullable();
            $table->foreign("user_id")
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
        Schema::dropIfExists('worker_category');
    }
}
