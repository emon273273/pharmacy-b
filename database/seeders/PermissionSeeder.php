<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $endpoints = [
            'user',
            'role',
        ];

        $permissionTypes = [
            'create',
            'read',
            'update',
            'delete',
        ];

        foreach ($endpoints as $endpoint) {
            Log::info('processing endpoint: ' . $endpoint);
            foreach ($permissionTypes as $type) {
                $permission = new Permission();
                $permission->name = $type . '-' . $endpoint;
                $permission->save();
            }
        }
    }
}
