<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTrainingExercise extends Model
{
    use HasFactory;

    protected $table = 'user_training_exercises';

    protected $fillable = [
        'exercise_id',
        'user_trainingID',
        'series',
        'rest',
        'comments',
        'weight',
        'active'
    ];

    public function exercise()
    {
        return $this->hasOne(Exercise::class, 'exercise_id');
    }

    public function training()
    {
        return $this->belongsTo(UserTraining::class, 'user_trainingID');
    }
    
    public function repetitions()
    {
        return $this->hasMany(UserExerciseRepetition::class, 'training_exerciseID');
    }
}
