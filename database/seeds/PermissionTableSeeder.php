<?php

use App\Permission;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            [
                'name' => 'Create',
                'slug' => 'create',
            ],
            [
                'name' => 'Read',
                'slug' => 'read',
            ],
            [
                'name' => 'Update',
                'slug' => 'update',
            ],
            [
                'name' => 'Delete',
                'slug' => 'delete',
            ],
            [
                'name' => 'Browse',
                'slug' => 'browse',
            ],
            [
                'name' => 'Search',
                'slug' => 'search',
            ],
        ];

        foreach ($permissions as $key => $value) {
            Permission::create($value);
        }
    }
}
