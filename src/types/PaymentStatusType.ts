export type PaymentStatus = "Pending" | "Succeeded" | "Failed";

export function getPaymentStatus(status: number | null): PaymentStatus {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "Succeeded";
    case 3:
      return "Failed";
    default:
      return "Pending";
  }
}
