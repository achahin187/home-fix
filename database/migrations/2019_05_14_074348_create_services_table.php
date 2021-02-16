<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name_en');
            $table->string('name_ar');
            $table->string('name_tr');
            $table->double('price')
                ->default(0.00);

            $table->bigInteger('category_id')
                ->unsigned()->nullable();
            $table->foreign("category_id")
                ->references("id")
                ->on("categories")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->boolean('checkup')
                ->default(false);
            $table->boolean('quick')
                ->default(false);
            $table->boolean('status')
                ->default(true);
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
        Schema::dropIfExists('services');
    }
}
