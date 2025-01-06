<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogExercise extends Model
{
    use HasFactory;

    protected $table = 'user_log_exercise';

    protected $fillable = [
        'exerciseID',
        'user_trainingID',
        'userID',
        'date',
        'weight',
        'done',
    ];

    public function exercise()
    {
        return $this->belongsTo(Exercise::class, 'user_exerciseID');
    }

    public function training()
    {
        return $this->belongsTo(UserTraining::class, 'user_trainingID');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }
}
