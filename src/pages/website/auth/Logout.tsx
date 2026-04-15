import { useEffect } from "react";
import { useLogout } from "../../../hooks/auth";

export default function Logout() {
  const { mutate, isPending } = useLogout();

  useEffect(() => {
    if (isPending) return;

    mutate();
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 lg:gap-5 pt-20">
      <h2 className="text-4xl lg:text-8xl font-bold">Logout</h2>
      <div className="flex items-center justify-center gap-2 mt-3 lg:mt-10">
        <div
          className="point bg-primary-text-dark rounded-full dark:bg-primary-text-light 
        animate-pulse  w-5 h-5 lg:w-16 lg:h-16 "
        />
        <div
          className="point bg-primary-text-dark rounded-full dark:bg-primary-text-light 
        animate-pulse animate-delay-200  w-5 h-5 lg:w-16 lg:h-16"
        />
        <div
          className="point bg-primary-text-dark rounded-full dark:bg-primary-text-light
         animate-pulse animate-delay-400  w-5 h-5 lg:w-16 lg:h-16"
        />
      </div>
    </div>
  );
}
