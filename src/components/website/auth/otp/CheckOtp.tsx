import { useEffect, useRef, type ChangeEvent, type SubmitEvent } from "react";
import { useTranslation } from "react-i18next";
import { useCheckOtp } from "../../../../hooks/auth";
import { useAppSelector } from "../../../../redux/hook/reduxHooks";
import { sendOtp } from "../../../../services/otpService";
import Button from "../../../ui/Button";

interface CheckOtpProps {
  onContinue: () => void;
}

export default function CheckOtp({ onContinue }: CheckOtpProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const otp = useRef<string[]>([]);
  const { email } = useAppSelector((state) => state.otp);

  //check otp
  const { mutate, isPending, error, isError } = useCheckOtp({
    onSuccess: onContinue,
  });

  const { t } = useTranslation();

  //focus on first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handelChange(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ): void {
    const index = Number(event.target.dataset.index);
    const value = event.target.value;

    if (value && !/^[0-9]$/.test(value)) {
      event.target.value = "";
      return;
    }

    inputRefs.current[index + 1]?.focus();
    otp.current[index] = value;

    if (index === inputRefs.current.length - 1) {
      formRef.current?.requestSubmit();
    }
  }

  function handelSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();

    //check if otp is valid
    if (otp.current.length !== 6) return;

    mutate({ otp: otp.current.join(""), email });
  }

  const inputElements = Array.from({ length: 6 }, (_, index) => (
    <input
      key={index}
      data-index={index}
      onChange={handelChange}
      ref={(el) => {
        inputRefs.current[index] = el!;
      }}
      minLength={1}
      maxLength={1}
      type="text"
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  ));

  return (
    <div className="space-y-4 w-full max-w-100 p-5">
      <h2 className="text-[36px]">{t("Check OTP")}</h2>
      <form onSubmit={handelSubmit} className="space-y-4 " ref={formRef}>
        <div className="flex gap-2 items-center justify-between">
          {inputElements}
        </div>
        <button
          type="button"
          className="text-blue-500 hover:underline cursor-pointer min-h-10"
          onClick={() => {
            sendOtp(email);
            inputRefs.current[0]?.focus();
          }}
        >
          {t("Resend OTP?")}
        </button>
        {isError && <p className="text-red-500">{error?.message}</p>}
        <div className="flex flex-col gap-4">
          <Button
            className="bg-blue-500 relative text-white p-2 rounded-md cursor-pointer block min-h-10"
            type="submit"
            disabled={isPending || otp.current.length !== 6}
            isLoading={isPending}
            text={t("continue")}
          />
        </div>
      </form>
    </div>
  );
}
