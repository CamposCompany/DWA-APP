<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // TO DO - Implement the logic to generate the reset password URL when Front is Done
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return match (true) {
                $user instanceof User => 'http://dwa/reset-password' . '?token=' . $token . '&email=' . urlencode($user->email),
                // other user types
                default => throw new \Exception("Invalid user type"),
            };
        });
    }
}
