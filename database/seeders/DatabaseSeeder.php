<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        if (env('APP_DEBUG') == true) {


            $this->call([
                PermissionSeeder::class,
                RoleSeeder::class
            ]);
        } else {

            PermissionSeeder::class;
            RoleSeeder::class;
        }
    }
}
