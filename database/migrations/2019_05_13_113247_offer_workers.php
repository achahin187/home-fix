<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OfferWorkers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offer_workers', function (Blueprint $table) {
            // Offers
            $table->bigInteger('offer_id')
                ->unsigned()->nullable();
            $table->foreign("offer_id")
                ->references("id")
                ->on("offers")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            // Workers
            $table->bigInteger('user_id')
                ->unsigned()->nullable();
            $table->foreign("user_id")
                ->references("id")
                ->on("users")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->boolean('status')->default(false);
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
        //
    }
}
