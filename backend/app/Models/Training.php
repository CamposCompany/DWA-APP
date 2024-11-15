<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Training extends Model implements Auditable
{
    use HasFactory, 
        \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'description',
        'category',
        'duration'
    ];

    /**
     * The attributes that should be cast to specific types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * Many-to-many relationship with the exercises table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function exercises() {
        return $this->belongsToMany(Exercise::class, 'exercise_training');
    }

}