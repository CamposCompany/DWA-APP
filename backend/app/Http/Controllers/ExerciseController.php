<?php

namespace App\Http\Controllers;

use App\Http\Requests\Exercise\ExerciseStoreRequest;
use App\Http\Requests\Exercise\ExerciseUpdateRequest;
use App\Services\ExceptionHandlerService;
use App\Services\ExerciseService;

class ExerciseController extends Controller
{
    protected $exerciseService;
    protected $exceptionHandlerService;

    /**
     * Constructor to inject dependencies.
     *
     * @param ExerciseService $exerciseService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(ExerciseService $exerciseService, ExceptionHandlerService $exceptionHandlerService) {
        $this->exerciseService = $exerciseService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index() {
        return $this->exceptionHandlerService->handle(function () {
            return $this->exerciseService->getAll();
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExerciseStoreRequest $request) {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->exerciseService->store($request->validated());
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return $this->exceptionHandlerService->handle(function () use ($id) {
            return $this->exerciseService->getById($id);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExerciseUpdateRequest $request, string $id) {
        return $this->exceptionHandlerService->handle(function () use ($request, $id) {
            return $this->exerciseService->update($request->all(), $id);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        return $this->exceptionHandlerService->handle(function () use ($id) {
            return $this->exerciseService->delete($id);
        });
    }
}
