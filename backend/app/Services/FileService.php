<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class FileService
{
    protected $responseService;

    public function __construct(ResponseService $responseService)
    {
        $this->responseService = $responseService;
    }

    public function upload($file, string $path): JsonResponse
    {
        try {
            $fileName = time() . '_' . $file->getClientOriginalName();
            $fullPath = $path . '/' . $fileName;

            // Upload file to S3
            Storage::disk('s3')->put($fullPath, file_get_contents($file));

            return $this->responseService->success('File uploaded successfully', [
                'path' => $fullPath,
                'url' => Storage::disk('s3')->config['url'] . '/' . $fullPath
            ], 201);
        } catch (\Exception $e) {
            return $this->responseService->error('Error uploading file: ' . $e->getMessage(), 500);
        }
    }

    public function delete(string $path): JsonResponse
    {
        try {
            if (!Storage::disk('s3')->exists($path)) {
                return $this->responseService->error('File not found', 404);
            }

            Storage::disk('s3')->delete($path);
            return $this->responseService->success('File deleted successfully');
        } catch (\Exception $e) {
            return $this->responseService->error('Error deleting file: ' . $e->getMessage(), 500);
        }
    }
}
