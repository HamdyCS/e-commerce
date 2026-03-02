import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import DropDownList from "../../ui/DropDownList";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const { t } = useTranslation();

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);
    document.documentElement.dir = i18n.dir();
    setOpen(false);
  }

  return (
    <div>
      <div className=" bg-black select-none">
        <div className="container px-2 py-4 mx-auto text-white">
          <div className="relative justify-self-end">
            <div
              className=" flex items-center gap-1 cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              <p>{i18n.language === "en" ? "English" : "العربية"}</p>
              <KeyboardArrowDownIcon
                className="text-white "
                style={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </div>
            {open && (
              <div className="absolute top-10 -left-1.25 z-50">
                <DropDownList
                  list={[
                    {
                      title: "English",
                      onCLick: () => changeLang("en"),
                    },
                    {
                      title: "العربية",
                      onCLick: () => changeLang("ar"),
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-b-black/10">
        <div className="container mx-auto px-2 py-5 flex items-center justify-between gap-5 flex-wrap">
          <h1 className="font-bold text-2xl">E-Commerce</h1>
          <div className="flex items-center justify-between gap-5 ">
            <NavLink
              to="/"
              end
              className={(x) =>
                `${(x.isActive || location.pathname === "/home") && "underline underline-offset-4"}`
              }
            >
              {t("Home")}
            </NavLink>
            <NavLink
              to="/contact"
              className={(x) =>
                `${x.isActive && "underline underline-offset-4"}`
              }
            >
              {t("Contact")}
            </NavLink>
            <NavLink
              to="/about"
              className={(x) =>
                `${x.isActive && "underline underline-offset-4"}`
              }
            >
              {t("About")}
            </NavLink>
            <NavLink
              to="/signup"
              className={(x) =>
                `${x.isActive && "underline underline-offset-4"}`
              }
            >
              {t("Sign Up")}
            </NavLink>
            <NavLink
              to="/login"
              className={(x) =>
                `${x.isActive && "underline underline-offset-4"}`
              }
            >
              {t("Login")}
            </NavLink>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center bg-[#F5F5F5] px-2 text-[12px] focus-within:border-b">
              <input
                type="text"
                className="grow outline-0 min-w-50"
                placeholder={t("What are you looking for?")}
              />
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
