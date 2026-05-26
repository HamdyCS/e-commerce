export type ApplicationOrderType =
  | "UnderProcessing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export function getApplicationOrderType(type: number): ApplicationOrderType {
  switch (type) {
    case 1:
      return "UnderProcessing";
    case 2:
      return "Shipped";
    case 3:
      return "Delivered";
    case 4:
      return "Cancelled";
    default:
      return "UnderProcessing";
  }
}
