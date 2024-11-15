<?php

namespace App\Http\Controllers;

use App\Services\ExceptionHandlerService;
use App\Services\ExerciseService;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    protected $exerciseService;
    protected $exceptionHandlerService;

    public function __construct(ExerciseService $exerciseService, ExceptionHandlerService $exceptionHandlerService) {
        $this->exerciseService = $exerciseService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
