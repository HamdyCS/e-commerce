import { useSearchParams } from "react-router-dom";
import { usePaymentBySessionId } from "../../../hooks/payment";

export default function PaymentVerificatio() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { data } = usePaymentBySessionId(sessionId!);

  return (
    <div className="flex  items-center justify-center gap-3">
      <h1 className="text-center text-2xl font-bold">Payment verification</h1>
      <div className="loader text-white"></div>
    </div>
  );
}
