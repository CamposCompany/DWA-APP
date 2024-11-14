<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ExerciseTraining extends Model implements Auditable
{
    use HasFactory,
        \OwenIt\Auditing\Auditable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'exercise_id', 
        'training_id', 
        'series', 
        'repetitions',
        'rest',
        'comments',
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
     * one-to-one relationship with the exercise table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function exercise() {
        return $this->belongsTo(Exercise::class);
    }

    /**
     * one-to-one relationship with the training table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */    
    public function training() {
        return $this->belongsTo(Training::class);
    }
}
