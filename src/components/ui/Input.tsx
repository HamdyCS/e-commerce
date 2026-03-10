import { type InputHTMLAttributes, type RefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: RefObject<HTMLInputElement | null>;
}

export default function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      className={`${className} border-b border-gray-300 rounded-md p-2 block w-full disabled:bg-gray-300/50`}
      {...props}
      ref={ref}
    />
  );
}
