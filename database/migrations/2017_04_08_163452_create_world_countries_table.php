<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWorldCountriesTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name_en')
                ->default('');
                $table->string('name_tr')
                ->default('');
                 $table->string('name_ar')
                ->default('');

             $table->string('currency_en')
                ->default('');
                $table->string('currency_tr')
                ->default('');
                $table->string('currency_ar')
                ->default('');

            $table->boolean('status')
                ->default(true);

            $table->unique([
                'name'
            ], 'uniq_country');

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
        Schema::drop('countries');
    }

}
