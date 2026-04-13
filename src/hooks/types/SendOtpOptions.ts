import type { HookOptions } from "./HookOptions";

export interface SendOtpOptions extends HookOptions<string> {
  type: "signUp" | "forgetPassword" | "updateEmail";
}
