import type { AxiosError } from "axios";

export interface UseHookOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}
