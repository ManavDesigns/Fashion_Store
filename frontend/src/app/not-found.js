import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="site-container" style={{ padding: "72px 0 96px" }}>
      <section
        style={{
          padding: "clamp(28px, 7vw, 60px)",
          border: "1px solid rgba(72, 47, 31, 0.12)",
          borderRadius: "36px",
          background:
            "linear-gradient(180deg, rgba(255, 250, 245, 0.82) 0%, rgba(243, 232, 222, 0.92) 100%)",
          boxShadow: "0 20px 55px rgba(56, 34, 19, 0.08)",
          textAlign: "center",
        }}
      >
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
          404
        </p>
        <h1
          style={{
            margin: "0 0 16px",
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(3rem, 7vw, 5rem)",
            lineHeight: 0.92,
          }}
        >
          This page slipped off the runway
        </h1>
        <p style={{ maxWidth: "620px", margin: "0 auto 26px", color: "#6a5e55", lineHeight: 1.8 }}>
          The page you requested could not be found. You can return to the homepage or
          continue browsing the live Bagisto-powered collection.
        </p>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
          <Button href="/" variant="primary">
            Back Home
          </Button>
          <Button href="/products" variant="secondary">
            Shop Products
          </Button>
        </div>
      </section>
    </div>
  );
}
