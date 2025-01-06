<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DisableCsrfForApi
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->is('api/*')) {
            // Disable CSRF protection for API routes
            return $next($request);
        }

        // For non-API routes, continue with normal CSRF protection
        return app(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class)->handle($request, $next);
    }
}
