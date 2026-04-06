"use client";

import { useState } from "react";
import Button from "../common/Button";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductActions({ product }) {
  const { addItem } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const [message, setMessage] = useState("");

  async function handleAddToCart() {
    await addItem({
      productId: product._id,
      _id: product._id,
      name: product.name,
      sku: product.sku,
      urlKey: product.urlKey,
      baseImageUrl: product.baseImageUrl,
      price: product.minimumPrice || product.price,
      type: product.type,
      quantity: 1,
    });

    setMessage("Added to cart.");
  }

  async function handleAddToWishlist() {
    await addToWishlist({
      productId: product._id,
      _id: product._id,
      name: product.name,
      sku: product.sku,
      urlKey: product.urlKey,
      baseImageUrl: product.baseImageUrl,
      price: product.minimumPrice || product.price,
      type: product.type,
    });

    setMessage("Saved to wishlist.");
  }

  return (
    <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <Button type="button" variant="primary" onClick={handleAddToCart}>
          Add To Bag
        </Button>
        <Button type="button" variant="secondary" onClick={handleAddToWishlist}>
          Save To Wishlist
        </Button>
      </div>

      {message ? <p style={{ margin: 0, color: "#166534" }}>{message}</p> : null}
    </div>
  );
}
