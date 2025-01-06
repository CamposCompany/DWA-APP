<?php

namespace App\Http\Controllers;

use App\Services\FileService;
use App\Services\ExceptionHandlerService;
use Illuminate\Http\Request;

class FileController extends Controller
{
    protected $fileService;
    protected $exceptionHandlerService;

    public function __construct(FileService $fileService, ExceptionHandlerService $exceptionHandlerService)
    {
        $this->fileService = $fileService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    public function upload(Request $request)
    {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            $request->validate([
                'file' => 'required|file|max:10240', // 10MB max
                'path' => 'required|string'
            ]);

            return $this->fileService->upload($request->file('file'), $request->path);
        });
    }

    public function delete(Request $request)
    {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            $request->validate([
                'path' => 'required|string'
            ]);

            return $this->fileService->delete($request->path);
        });
    }
}
