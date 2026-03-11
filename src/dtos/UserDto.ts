export default interface UserDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  password: string;
  roles: Role[];
}

export type Role = "Customer" | "DeliveryAgent" | "Admin" | "Seller";

export function getRoleName(role: Role) {
  switch (role) {
    case "Customer":
      return "Customer";
    case "DeliveryAgent":
      return "Delivery Agent";
    case "Admin":
      return "Admin";
    case "Seller":
      return "Seller";
    default:
      return "Unknown";
  }
}
