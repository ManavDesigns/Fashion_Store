import { redirect } from "next/navigation";
import { bagistoApi } from "../../lib/bagisto";

const DEFAULT_PRODUCT_ID = 2;

export default function SendDataExample({ statusMessage }) {
  async function addToCartAction(formData) {
    "use server";

    // READ FORM DATA:
    // These values come from the frontend form inputs.
    const productId = Number(formData.get("productId"));
    const quantity = Number(formData.get("quantity"));

    try {
      // SEND DATA TO BACKEND:
      // This passes productId and quantity to Bagisto.
      // Bagisto will use this data to add the item into the cart.
      await bagistoApi.cart.addItem({
        productId,
        quantity,
      });

      // After successful backend response, we reload page with success message.
      redirect("/examples?status=success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not send data to Bagisto";

      // If backend returns error, we redirect with error message.
      redirect(`/examples?status=error&message=${encodeURIComponent(message)}`);
    }
  }

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
        Send Data Example
      </p>

      <h2 style={{ marginBottom: "12px", fontSize: "1.5rem" }}>
        Pass data from frontend to backend
      </h2>

      <p style={{ marginBottom: "18px", color: "#5d5149", lineHeight: 1.7 }}>
        This example sends a product ID and quantity to Bagisto using{" "}
        <code>bagistoApi.cart.addItem()</code>.
      </p>

      {/* FRONTEND FORM:
          User enters data here.
          When submit is clicked, `addToCartAction` sends it to backend. */}
      <form action={addToCartAction} style={{ display: "grid", gap: "12px" }}>
        <label style={{ display: "grid", gap: "6px" }}>
          <span style={{ fontWeight: 600 }}>Product ID</span>
          <input
            type="number"
            name="productId"
            defaultValue={DEFAULT_PRODUCT_ID}
            min="1"
            style={{
              padding: "12px",
              border: "1px solid #d6c6b6",
              borderRadius: "12px",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: "6px" }}>
          <span style={{ fontWeight: 600 }}>Quantity</span>
          <input
            type="number"
            name="quantity"
            defaultValue="1"
            min="1"
            style={{
              padding: "12px",
              border: "1px solid #d6c6b6",
              borderRadius: "12px",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "fit-content",
            padding: "12px 18px",
            border: 0,
            borderRadius: "999px",
            background: "#1f1a17",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Send To Backend
        </button>
      </form>

      <p style={{ marginTop: "16px", color: "#5d5149", lineHeight: 1.7 }}>
        Sample product ID <code>{DEFAULT_PRODUCT_ID}</code> is a simple variant,
        so it works better for add-to-cart than a configurable parent product.
      </p>

      {statusMessage ? (
        <p
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "12px",
            background: statusMessage.type === "error" ? "#fde8e8" : "#e8f6ea",
            color: statusMessage.type === "error" ? "#9b1c1c" : "#166534",
          }}
        >
          {statusMessage.text}
        </p>
      ) : null}
    </section>
  );
}
