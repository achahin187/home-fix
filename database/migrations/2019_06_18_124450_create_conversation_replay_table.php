<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConversationReplayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversation_replay', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('message')->nullable();
            $table->boolean('attachment')->default(false);

            $table->bigInteger('conversation_id')
                ->unsigned()->nullable();
            $table->foreign("conversation_id")
                ->references("con_id")
                ->on("conversations")
                ->onDelete("cascade")
                ->onUpdate("cascade");

            $table->bigInteger('user_id')
                ->unsigned()->nullable();
            $table->foreign('user_id')
                ->references("id")
                ->on("users")
                ->onDelete("cascade")
                ->onUpdate("cascade");

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
        Schema::dropIfExists('conversation_replay');
    }
}
