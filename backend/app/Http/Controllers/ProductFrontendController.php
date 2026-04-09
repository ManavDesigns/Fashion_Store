<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Webkul\Product\Models\Product;
use Webkul\Product\Models\ProductFlat;

class ProductFrontendController extends Controller
{
    public function show(int $id): JsonResponse
    {
        $product = Product::with(['images'])
            ->findOrFail($id);

        $productFlat = ProductFlat::query()
            ->where('product_id', $product->id)
            ->where('channel', core()->getCurrentChannelCode())
            ->where('locale', core()->getRequestedLocaleCode())
            ->where('status', 1)
            ->firstOrFail();

        return response()->json([
            'id' => $product->id,
            'name' => $productFlat->name,
            'sku' => $productFlat->sku,
            'type' => $productFlat->type,
            'price' => $productFlat->price,
            'special_price' => $productFlat->special_price,
            'short_description' => $productFlat->short_description,
            'description' => $productFlat->description,
            'url_key' => $productFlat->url_key,
            'image' => $product->images->first()?->url,
        ]);
    }
}
