<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'document',
        'password',
        'telephone',
        'gender',
        'profile_image',
        'active',
        'points',
        'deleted_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function roles() {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
    }

    public function hasRole($role) {
        return $this->roles()->where('name', $role)->exists();
    }

    public function setPasswordAttribute($value) {
        $this->attributes['password'] = bcrypt($value);
    }
}