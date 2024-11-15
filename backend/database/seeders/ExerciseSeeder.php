<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvPath = storage_path('assets/exercises.csv');

        if (!file_exists($csvPath)) {
            $this->command->error("CSV not found on: $csvPath");
            return;
        }

        $data = array_map('str_getcsv', file($csvPath));

        $headers = array_map('trim', $data[0]);
        $rows = array_slice($data, 1);

        foreach ($rows as $row) {
            $rowData = array_combine($headers, $row);

            DB::table('exercises')->insert([
                'name'        => $rowData['name'] ?? null,
                'category'    => $rowData['category'] ?? null,
                'equipment'   => $rowData['equipment'] ?? null,
                'description' => $rowData['description'] ?? null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}
