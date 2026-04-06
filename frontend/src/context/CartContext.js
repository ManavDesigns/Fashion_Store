"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { bagistoApi } from "../lib/bagisto";

const STORAGE_KEY = "fashion-store-cart";

const CartContext = createContext(null);

function readStoredCart() {
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

function writeStoredCart(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  async function syncAddToBackend(item) {
    if (!item?.productId) {
      return;
    }

    try {
      await bagistoApi.cart.addItem({
        productId: item.productId,
        quantity: item.quantity,
      });
    } catch {
      // Local state remains usable even when backend cart sync is unavailable.
    }
  }

  async function syncUpdateToBackend(item) {
    if (!item?.backendCartItemId) {
      return;
    }

    try {
      await bagistoApi.cart.updateItem({
        cartItemId: item.backendCartItemId,
        quantity: item.quantity,
      });
    } catch {
      // Ignore backend sync errors and keep local cart responsive.
    }
  }

  async function syncRemoveFromBackend(item) {
    if (!item?.backendCartItemId) {
      return;
    }

    try {
      await bagistoApi.cart.removeItem(item.backendCartItemId);
    } catch {
      // Ignore backend sync errors and keep local cart responsive.
    }
  }

  async function addItem(product) {
    const productId = Number(product.productId || product._id || product.id);

    const nextItem = {
      id: product.id || product.urlKey || String(productId),
      productId,
      urlKey: product.urlKey || "",
      name: product.name || "Product",
      sku: product.sku || "",
      image: product.baseImageUrl || product.image || "",
      price: Number(product.price || product.minimumPrice || 0),
      quantity: Number(product.quantity || 1),
      type: product.type || "",
      backendCartItemId: product.backendCartItemId || null,
    };

    setStatus("syncing");

    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.productId === nextItem.productId);

      if (!existing) {
        return [...currentItems, nextItem];
      }

      return currentItems.map((item) =>
        item.productId === nextItem.productId
          ? { ...item, quantity: item.quantity + nextItem.quantity }
          : item
      );
    });

    await syncAddToBackend(nextItem);
    setStatus("idle");
  }

  async function updateQuantity(itemId, quantity) {
    const nextQuantity = Math.max(1, Number(quantity));
    let updatedItem = null;

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        updatedItem = { ...item, quantity: nextQuantity };
        return updatedItem;
      })
    );

    if (updatedItem) {
      await syncUpdateToBackend(updatedItem);
    }
  }

  async function removeItem(itemId) {
    const currentItem = items.find((item) => item.id === itemId);
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));

    if (currentItem) {
      await syncRemoveFromBackend(currentItem);
    }
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const total = subtotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    subtotal,
    total,
    itemCount,
    status,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
