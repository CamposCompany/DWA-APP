<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserExerciseRepetition extends Model
{
    use HasFactory;

    protected $table = 'user_exercise_repetition';

    protected $fillable = [
        'training_exerciseID',
        'repetitions'
    ];

    public function exercise()
    {
        return $this->belongsToMany(UserTrainingExercise::class, 'exerciseID');
    }
}
