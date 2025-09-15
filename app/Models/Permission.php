<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    //
    protected $table = 'permissions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];

    // Define relationships
    public function rolePermission(){
        return $this->hasMany(RolePermission::class, 'permission_id');
    }
}
