<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin_role       = new Role();
        $admin_role->slug = 'super-admin';
        $admin_role->name = 'Super Administrator';
        $admin_role->save();

        $manager_role       = new Role();
        $manager_role->slug = 'admin';
        $manager_role->name = 'Administrator';
        $manager_role->save();

        $manager_role       = new Role();
        $manager_role->slug = 'manager';
        $manager_role->name = 'Manager';
        $manager_role->save();
    }
}
