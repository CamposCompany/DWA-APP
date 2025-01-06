<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;


return Application::configure(basePath: dirname(__DIR__))

    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up'
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
        $middleware->api(prepend: [
            // \App\Http\Middleware\ApiForceJsonResponse::class,
            // \App\Http\Middleware\Cors::class,
            // \App\Http\Middleware\DisableCsrfForApi::class,
        ]);

        $middleware->redirectGuestsTo(function (Request $request) {
            if (!$request->is('api/*')) {
                return route('/');
            }
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Usuário não autenticado.'
                ], 401);
            }
        });
    })->create();
