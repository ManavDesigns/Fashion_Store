import { bagistoApi } from "../../lib/bagisto";

export default async function GetProductsExample() {
  // GET DATA:
  // This calls the Bagisto backend and reads product data.
  // The request goes through `bagistoApi.catalog.getProducts()`.
  const productsResponse = await bagistoApi.catalog.getProducts({ first: 6 });
  const products = productsResponse.items;

  return (
    <section
      style={{
        padding: "24px",
        border: "1px solid #e7ddd2",
        borderRadius: "20px",
        background: "#fffdf9",
      }}
    >
      <p
        style={{
          marginBottom: "10px",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8a5a2f",
        }}
      >
        Get Data Example
      </p>

      <h2 style={{ marginBottom: "12px", fontSize: "1.5rem" }}>
        Products from Bagisto backend
      </h2>

      <p style={{ marginBottom: "18px", color: "#5d5149", lineHeight: 1.7 }}>
        This component reads data from Bagisto using{" "}
        <code>bagistoApi.catalog.getProducts()</code>.
      </p>

      {/* SHOW DATA:
          After getting data from backend, we loop over the products
          and display them on the frontend. */}
      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              background: "#f6efe7",
            }}
          >
            <p style={{ fontSize: "0.8rem", color: "#8a5a2f" }}>{product.type}</p>
            <h3 style={{ margin: "6px 0", fontSize: "1rem" }}>{product.name}</h3>
            <p style={{ color: "#5d5149" }}>SKU: {product.sku}</p>
            <p style={{ color: "#7c3c19", fontWeight: 700 }}>
              Price: {product.minimumPrice || product.price}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
