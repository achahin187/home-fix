<?php

use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /*
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Super Administrator
        $super_role   = Role::where('slug', 'super-admin')->first();
        $admin_role   = Role::where('slug', 'admin')->first();
        $manager_role = Role::where('slug', 'manager')->first();

        $super                    = new User();
        $super->name              = 'Super Administrator';
        $super->email             = 'super-admin@homefix.com';
        $super->password          = bcrypt('123456789');
        $super->phone             = '01234567890';
        $super->phone_verified_at = Carbon::now();
        $super->notes             = 'Super Admin Account!';
        $super->role              = 'super-admin';
        $super->ban               = false;
        $super->verified          = true;
        $super->save();

        $avatar = Avatar::create($super->name)
            ->setFont(asset('fonts/globals/NotoNaskhArabicUI.ttf'))
            ->getImageObject()->encode('png');
        Storage::disk("uploads")->put('avatars/' .
            $super->id . '/avatar.png', (string)$avatar);

        $super->roles()->attach($super_role);

        // Administrator
        $admin                    = new User();
        $admin->name              = 'Administrator';
        $admin->email             = 'admin@homefix.com';
        $admin->password          = bcrypt('123456789');
        $admin->phone             = '01298765430';
        $admin->phone_verified_at = Carbon::now();
        $admin->notes             = 'Admin Account!';
        $admin->role              = 'admin';
        $admin->ban               = false;
        $admin->verified          = true;
        $admin->save();

        $avatar = Avatar::create($admin->name)
            ->setFont(asset('fonts/globals/NotoNaskhArabicUI.ttf'))
            ->getImageObject()->encode('png');
        Storage::disk("uploads")->put('avatars/' .
            $admin->id . '/avatar.png', (string)$avatar);

        $admin->roles()->attach($admin_role);

        // Manager
        $manager                    = new User();
        $manager->name              = 'Manager';
        $manager->email             = 'manager@homefix.com';
        $manager->password          = bcrypt('123456789');
        $manager->phone             = '01298745630';
        $manager->phone_verified_at = Carbon::now();
        $manager->notes             = 'Manager Account!';
        $manager->role              = 'manager';
        $manager->ban               = false;
        $manager->verified          = true;
        $manager->save();

        $avatar = Avatar::create($manager->name)
            ->setFont(asset('fonts/globals/NotoNaskhArabicUI.ttf'))
            ->getImageObject()->encode('png');
        Storage::disk("uploads")->put('avatars/' .
            $manager->id . '/avatar.png', (string)$avatar);

        $manager->roles()->attach($manager_role);

        // Client
        $client                    = new User();
        $client->name              = 'Client Name';
        $client->email             = 'client@homefix.com';
        $client->password          = bcrypt('123456789');
        $client->phone             = '01234567891';
        $client->phone_verified_at = Carbon::now();
        $client->notes             = 'Client Account!';
        $client->role              = 'client';
        $client->ban               = false;
        $client->verified          = true;
        $client->save();

        $avatar = Avatar::create($client->name)
            ->setFont(asset('fonts/globals/NotoNaskhArabicUI.ttf'))
            ->getImageObject()->encode('png');
        Storage::disk("uploads")->put('avatars/' .
            $client->id . '/avatar.png', (string)$avatar);

        // Worker
        $worker                    = new User();
        $worker->name              = 'Worker Name';
        $worker->email             = 'worker@homefix.com';
        $worker->password          = bcrypt('123456789');
        $worker->phone             = '01234567892';
        $worker->phone_verified_at = Carbon::now();
        $worker->notes             = 'Worker Account!';
        $worker->role              = 'worker';
        $worker->ban               = false;
        $worker->verified          = true;
        $worker->save();

        $avatar = Avatar::create($worker->name)
            ->setFont(asset('fonts/globals/NotoNaskhArabicUI.ttf'))
            ->getImageObject()->encode('png');
        Storage::disk("uploads")->put('avatars/' .
            $worker->id . '/avatar.png', (string)$avatar);
    }
}
