import React from "react";
import Spinner from "../loading/Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
  className?: string;
}

export default function Button({
  className,
  isLoading,
  text,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`relative bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded-md cursor-pointer min-w-20 h-10  ${className}`}
      {...props}
    >
      {isLoading ? <Spinner size="20" /> : text}
    </button>
  );
}
