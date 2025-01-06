<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserTraining extends Model
{
    use HasFactory;

    protected $table = 'user_trainings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'description',
        'origin_trainingID',
        'user_id',
        'position',
        'active',
        'start_date',
        'expire_date',
        'objective'
    ];

    /**
     * The attributes that should be cast to specific types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'active' => 'boolean',
        'start_date' => 'datetime',
        'expire_date' => 'datetime',
    ];

    /**
     * Get the original training that this training was copied from.
     */
    public function origin(): HasOne
    {
        return $this->hasOne(UserTraining::class, 'origin_trainingID');
    }

    /**
     * Get the user that owns this training.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the exercises for this training.
     */
    public function exercises(): HasMany
    {
        return $this->hasMany(UserTrainingExercise::class, 'user_trainingID');
    }
}
