<?php

namespace Database\Factories;

use App\Models\Exercise;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExerciseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Exercise::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(10),
            'equipment' => $this->faker->word(),
            'category' => $this->faker->randomElement(['cardio', 'força', 'flexibilidade', 'equilíbrio']),
            'image' => $this->faker->imageUrl(640, 480, 'sports', true, 'exercicio'),
            'video' => $this->faker->url(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
