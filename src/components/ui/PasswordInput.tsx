import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Input from "./Input";

interface PasswordInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
}

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  ref,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className="ltr:pr-10 rtl:pl-10"
        ref={ref}
      />
      <FontAwesomeIcon
        cursor={"pointer"}
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 text-blue-500"
        icon={showPassword ? faEye : faEyeSlash}
      />
    </div>
  );
}
