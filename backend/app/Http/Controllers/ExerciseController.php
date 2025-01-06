<?php

namespace App\Http\Controllers;

use App\Http\Requests\Exercise\ExerciseStoreRequest;
use App\Http\Requests\Exercise\ExerciseUpdateRequest;
use App\Services\ExceptionHandlerService;
use App\Services\ExerciseService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExerciseController extends BaseController
{
    private ExerciseService $exerciseService;
    private const UPLOAD_PATH = 'dwa/exercises';

    /**
     * Constructor to inject dependencies.
     *
     * @param ExerciseService $exerciseService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(
        ExerciseService $exerciseService,
        ExceptionHandlerService $exceptionHandlerService
    ) {
        parent::__construct($exceptionHandlerService);
        $this->exerciseService = $exerciseService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse {
        return $this->handleRequest(fn () =>
            $this->exerciseService->getAll($request)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ExerciseStoreRequest $request
     * @return JsonResponse
     */
    public function store(ExerciseStoreRequest $request): JsonResponse
    {
        $this->setResourceLimits();

        return $this->handleRequest(function () use ($request) {
            $data = $request->validated();
            $data = $this->handleFileUploads($request, $data);

            return $this->exerciseService->store($data);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse {
        return $this->handleRequest(fn () =>
            $this->exerciseService->getById($id)
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ExerciseUpdateRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(ExerciseUpdateRequest $request, string $id): JsonResponse {
        $this->setResourceLimits();

        return $this->handleRequest(function () use ($request, $id) {
            $data = $request->validated();
            $data = $this->handleFileUploads($request, $data);

            return $this->exerciseService->update($data, $id);
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse {
        return $this->handleRequest(fn () =>
            $this->exerciseService->delete($id)
        );
    }

    /**
     * Set resource limits for file handling
     */
    private function setResourceLimits(): void {
        ini_set('max_execution_time', 300);
        ini_set('memory_limit', '256M');
    }

    /**
     * Handle file uploads for both store and update operations
     *
     * @param ExerciseStoreRequest|ExerciseUpdateRequest $request
     * @param array $data
     * @return array
     */
    private function handleFileUploads($request, array $data): array {
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = Storage::disk('s3')->put(self::UPLOAD_PATH . '/images', $file);
            $data['image'] = Storage::disk('s3')->url($path);
        }

        if ($request->hasFile('video')) {
            $file = $request->file('video');
            $path = Storage::disk('s3')->put(self::UPLOAD_PATH . '/videos', $file);
            $data['video'] = Storage::disk('s3')->url($path);
        } elseif ($request->has('video_url')) {
            $data['video'] = $request->video_url;
        }

        return $data;
    }
}
