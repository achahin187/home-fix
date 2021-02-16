<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name_en');
            $table->string('name_ar');
            $table->string('name_tr');
            $table->string('description_en');
            $table->string('description_ar');
            $table->string('description_tr');
            $table->string('image')
                ->default('image.png');
            $table->double('price');

            $table->bigInteger('category_id')
                ->unsigned()->nullable();
            $table->foreign("category_id")
                ->references("id")
                ->on("categories")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->boolean('status')
                ->default(true);
            $table->timestamp('end_at')
                ->default(now());
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
        Schema::dropIfExists('offers');
    }
}
