import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FailedPaymentPage() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        {/* Icon */}
        <div style={{ fontSize: "60px", marginBottom: "10px" }}>❌</div>

        {/* Title */}
        <h2 style={{ marginBottom: "10px", color: "#dc2626" }}>
          {t("Payment Failed")}
        </h2>

        {/* Subtitle */}
        <p style={{ color: "#6b7280", marginBottom: "30px" }}>
          {t(
            "An error occurred while processing the payment. You can try again.",
          )}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            to={"/checkout"}
            className=""
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {t("Retry")}
          </Link>

          <Link
            to={""}
            style={{
              backgroundColor: "#e5e7eb",
              color: "#111827",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {t("Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FailedPaymentPage;
