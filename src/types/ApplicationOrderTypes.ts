export type ApplicationOrderType = "UnderProcessing" | "Shipped" | "Delivered";

export function getApplicationOrderType(type: number): ApplicationOrderType {
  switch (type) {
    case 1:
      return "UnderProcessing";
    case 2:
      return "Shipped";
    case 3:
      return "Delivered";
    default:
      return "UnderProcessing";
  }
}
