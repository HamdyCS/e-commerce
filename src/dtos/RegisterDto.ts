import type { UserDto } from "./UserDto";

export interface RegisterDto {
  Otp: string;
  userDto: UserDto;
}
