import type { UserDto } from "./UserDto";

export interface SignUpDto {
  Otp: string;
  userDto: UserDto;
}
