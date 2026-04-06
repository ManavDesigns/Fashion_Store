import Breadcrumb from "../../components/common/Breadcrumb";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="site-container" style={{ padding: "36px 0 72px" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Login" },
        ]}
      />

      <section
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          padding: "30px",
          border: "1px solid rgba(72, 47, 31, 0.12)",
          borderRadius: "28px",
          background: "rgba(255, 252, 247, 0.9)",
          boxShadow: "0 20px 50px rgba(56, 34, 19, 0.08)",
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
          Welcome Back
        </p>

        <h1
          style={{
            margin: "0 0 14px",
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            lineHeight: 0.95,
          }}
        >
          Sign in to your account
        </h1>

        <p style={{ margin: "0 0 20px", color: "#6a5e55", lineHeight: 1.7 }}>
          This form is connected to the available Bagisto customer login endpoint.
          If session handling differs in deployment, the UI is already ready for your auth flow.
        </p>

        <LoginForm />
      </section>
    </div>
  );
}
