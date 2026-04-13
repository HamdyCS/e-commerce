import type { AxiosError } from "axios";

export interface HookOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}
