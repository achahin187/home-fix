<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('address')->default('');
            $table->string('cc')->default('');
            $table->string('latitude')->default('');
            $table->string('longitude')->default('');
            $table->string('avatar')->default('avatar.png');

            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->timestamp('phone_verified_at')->nullable();
            $table->string('password');
            $table->string('api_token')
                ->unique()->nullable();

            $table->string('notes')->default('');
            $table->double('review')->default(0);

            $table->string('role');

            $table->boolean('ban')->default(false);
            $table->boolean('verified')->default(false);
            $table->string('activation_key')->nullable();
            $table->string('notifications_key')->nullable();

            $table->string('cv')
                ->default('');
            $table->string('identity')
                ->default('');
            $table->string('badge')
                ->default('');

            $table->string('locale')
                ->default();

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
