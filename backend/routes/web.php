<?php

use App\Http\Controllers\API\ProductFrontendController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/frontend')->group(function () {
    Route::get('products/{id}', [ProductFrontendController::class, 'show']);
});
