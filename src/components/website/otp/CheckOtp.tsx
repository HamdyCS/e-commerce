import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, type ChangeEvent, type SubmitEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hook/reduxHooks";
import { checkOtp } from "../../../services/otpService";
import { setOtp } from "../../../redux/slices/signUpSlice";
import Spinner from "../../loading/Spinner";

interface CheckOtpProps {
  onContinue: () => void;
}

export default function CheckOtp({ onContinue }: CheckOtpProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const otp = useRef<string[]>([]);
  const { email } = useAppSelector((state) => state.signUp);
  const dispatch = useAppDispatch();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: () => checkOtp(email, otp.current.join("")),
    onSuccess: () => {
      dispatch(setOtp(otp.current.join("")));
      onContinue();
    },
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

    mutate();
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
        {isError && <p className="text-red-500">{error?.message}</p>}
        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-500 relative text-white p-2 rounded-md cursor-pointer block min-h-10"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Spinner size="20" />}
            {!isPending && t("continue")}
          </button>
        </div>
      </form>
    </div>
  );
}
