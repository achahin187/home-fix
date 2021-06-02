<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTechnicalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('technicals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('ar_title');
            $table->string('en_title');
            $table->string('tr_title');
            $table->text('ar_section');
            $table->text('en_section');
            $table->text('tr_section');
            $table->text('ar_description');
            $table->text('en_description');
            $table->text('tr_description');
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
        Schema::dropIfExists('technicals');
    }
}
