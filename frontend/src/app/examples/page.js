import GetProductsExample from "../../components/bagisto-examples/GetProductsExample";
import SendDataExample from "../../components/bagisto-examples/SendDataExample";

function getStatusMessage(searchParams) {
  const status = searchParams?.status;
  const message = searchParams?.message;

  if (status === "success") {
    return {
      type: "success",
      text: "Data was sent to the backend successfully.",
    };
  }

  if (status === "error") {
    return {
      type: "error",
      text: message || "Backend request failed.",
    };
  }

  return null;
}

export default async function ExamplesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  // This reads the status from the page URL after sending data.
  // Example:
  // `/examples?status=success`
  // `/examples?status=error&message=Something went wrong`
  const statusMessage = getStatusMessage(resolvedSearchParams);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 16px 64px",
        background:
          "linear-gradient(180deg, rgb(248, 241, 232) 0%, rgb(255, 250, 244) 100%)",
      }}
    >
      <div
        style={{
          width: "min(960px, 100%)",
          margin: "0 auto",
          display: "grid",
          gap: "20px",
        }}
      >
        <section
          style={{
            padding: "28px",
            borderRadius: "24px",
            background: "#ffffff",
            border: "1px solid #eadfd4",
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
            Example Page
          </p>

          <h1 style={{ marginBottom: "12px", fontSize: "2.2rem" }}>
            How to use Bagisto API in any page
          </h1>

          <p style={{ color: "#5d5149", lineHeight: 1.8 }}>
            Import the component you need in any page, for example:
          </p>

          {/* This code block shows how to use both components
              inside any page in your app. */}
          <pre
            style={{
              marginTop: "16px",
              padding: "16px",
              borderRadius: "16px",
              background: "#1f1a17",
              color: "#fff7ef",
              overflowX: "auto",
            }}
          >
            <code>{`import GetProductsExample from "../../components/bagisto-examples/GetProductsExample";
import SendDataExample from "../../components/bagisto-examples/SendDataExample";

export default function MyPage() {
  return (
    <>
      <GetProductsExample />
      <SendDataExample />
    </>
  );
}`}</code>
          </pre>
        </section>

        {/* GET component:
            This component fetches data from Bagisto and shows it. */}
        <GetProductsExample />

        {/* POST/SEND component:
            This component sends form data from frontend to Bagisto backend. */}
        <SendDataExample statusMessage={statusMessage} />
      </div>
    </main>
  );
}
