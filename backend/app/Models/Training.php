<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;

class Training implements Auditable
{
    use HasApiTokens, Notifiable, HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'description',,
        'category',
        'duration',
        'active',
        'deleted_at',
    ];

    public function exercises() {
        // TODO: Implement exercises relationship
        // return $this->hasMany(Exercise::class);
    }


}