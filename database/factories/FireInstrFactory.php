<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fire_instr>
 */
class FireInstrFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id_worker' => fake(),
            'date_check_last' => fake()->numberBetween([100,200]),
            'date_check_next' => fake()->jobTitle,
        ];
    }
}
