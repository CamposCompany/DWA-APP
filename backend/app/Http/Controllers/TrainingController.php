<?php

namespace App\Http\Controllers;

use App\Http\Requests\Training\TrainingStoreRequest;
use App\Http\Requests\Training\TrainingUpdateRequest;
use App\Services\ExceptionHandlerService;
use App\Services\TrainingService;

class TrainingController extends Controller
{
    protected $trainingService;
    protected $exceptionHandlerService;

    /**
     * Constructor to inject dependencies.
     *
     * @param TrainingService $trainingService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(TrainingService $trainingService, ExceptionHandlerService $exceptionHandlerService) {
        $this->trainingService = $trainingService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index() {
        return $this->exceptionHandlerService->handle(function () {
            return $this->trainingService->getAll();
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TrainingStoreRequest $request) {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->trainingService->create($request->all());
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return $this->exceptionHandlerService->handle(function () use ($id) {
            return $this->trainingService->getById($id);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TrainingUpdateRequest $request, string $id) {
        return $this->exceptionHandlerService->handle(function () use ($request, $id) {
            return $this->trainingService->update($request->all(), $id);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        return $this->exceptionHandlerService->handle(function () use ($id) {
            return $this->trainingService->delete($id);
        });
    }
}
