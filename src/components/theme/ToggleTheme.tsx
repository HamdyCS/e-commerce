import "@theme-toggles/react/css/Within.css";
import { Within } from "@theme-toggles/react";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHooks";
import { setTheme } from "../../redux/slices/themeSlice";
import { setItemToLocalStorage } from "../../services/localStorageService";

export default function ToggleTheme() {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  function handelChangeTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    dispatch(setTheme(newTheme));
    setItemToLocalStorage("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <Within
      duration={1000}
      className="text-2xl"
      toggled={theme === "dark"}
      onToggle={handelChangeTheme}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    />
  );
}
