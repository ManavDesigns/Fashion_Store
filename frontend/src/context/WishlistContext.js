"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { bagistoApi } from "../lib/bagisto";

const STORAGE_KEY = "fashion-store-wishlist";

const WishlistContext = createContext(null);

function readStoredWishlist() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStoredWishlist(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readStoredWishlist);

  useEffect(() => {
    writeStoredWishlist(items);
  }, [items]);

  async function addItem(product) {
    const nextItem = {
      id: product.id || product.urlKey || String(product._id || product.productId),
      productId: Number(product.productId || product._id || product.id),
      urlKey: product.urlKey || "",
      name: product.name || "Product",
      sku: product.sku || "",
      image: product.baseImageUrl || product.image || "",
      price: Number(product.price || product.minimumPrice || 0),
      type: product.type || "",
      backendWishlistId: product.backendWishlistId || null,
    };

    setItems((currentItems) => {
      if (currentItems.some((item) => item.productId === nextItem.productId)) {
        return currentItems;
      }

      return [...currentItems, nextItem];
    });

    try {
      await bagistoApi.wishlist.add(nextItem.productId);
    } catch {
      // Wishlist remains functional locally even if backend wishlist requires auth/session.
    }
  }

  async function removeItem(itemId) {
    const currentItem = items.find((item) => item.id === itemId);
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));

    if (!currentItem?.backendWishlistId) {
      return;
    }

    try {
      await bagistoApi.wishlist.remove(currentItem.backendWishlistId);
    } catch {
      // Ignore backend errors and keep local wishlist state.
    }
  }

  function clearWishlist() {
    setItems([]);
  }

  const value = {
    items,
    addItem,
    removeItem,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
