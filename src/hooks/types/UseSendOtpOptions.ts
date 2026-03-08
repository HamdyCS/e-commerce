import type { UseHookOptions } from "./UseHookOptions";

export interface UseSendOtpOptions extends UseHookOptions<string> {
  type: "signUp" | "forgetPassword";
}
