"use client";

import Link from "next/link";
import Breadcrumb from "../../components/common/Breadcrumb";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function WishlistPageContent() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  async function moveToCart(item) {
    await addItem({
      productId: item.productId,
      _id: item.productId,
      name: item.name,
      sku: item.sku,
      urlKey: item.urlKey,
      baseImageUrl: item.image,
      price: item.price,
      type: item.type,
      quantity: 1,
    });

    await removeItem(item.id);
  }

  return (
    <div className="site-container" style={{ padding: "36px 0 72px" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
      />

      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            margin: "0 0 10px",
            color: "#7b3f1d",
            fontSize: "0.8rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Wishlist
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
            lineHeight: 0.95,
          }}
        >
          Saved items for later
        </h1>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Wishlist state is ready with local persistence and optional backend sync hooks."
        />
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
              marginBottom: "20px",
            }}
          >
            {items.map((item) => (
              <article
                key={item.id}
                style={{
                  overflow: "hidden",
                  border: "1px solid rgba(72, 47, 31, 0.12)",
                  borderRadius: "24px",
                  background: "rgba(255, 252, 247, 0.86)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "0.86",
                    background: item.image
                      ? `center / cover no-repeat url(${item.image})`
                      : "#f1e7dd",
                  }}
                />

                <div style={{ display: "grid", gap: "10px", padding: "18px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 6px" }}>{item.name}</h3>
                    <p style={{ margin: 0, color: "#6a5e55" }}>{item.sku}</p>
                  </div>

                  <p style={{ margin: 0, fontWeight: 700 }}>Rs. {Number(item.price).toFixed(2)}</p>

                  <div style={{ display: "grid", gap: "10px" }}>
                    {item.urlKey ? (
                      <Link href={`/products/${item.urlKey}`} style={{ color: "#7b3f1d" }}>
                        View product
                      </Link>
                    ) : null}

                    <Button type="button" variant="primary" onClick={() => moveToCart(item)}>
                      Move To Cart
                    </Button>

                    <Button type="button" variant="secondary" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Button type="button" variant="ghost" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        </>
      )}
    </div>
  );
}

export default function WishlistPage() {
  return <WishlistPageContent />;
}
