import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import DropDownList from "../../ui/DropDownList";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();

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
                      onCLick: () => {
                        i18n.changeLanguage("en");
                        document.documentElement.dir = i18n.dir();
                      },
                    },
                    {
                      title: "العربية",
                      onCLick: () => {
                        i18n.changeLanguage("ar");
                        document.documentElement.dir = i18n.dir();
                      },
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
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={(x) =>
                `${x.isActive && "underline underline-offset-4"}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className={(x) =>
                `${x.isActive && "underline underline-offset-4"}`
              }
            >
              About
            </NavLink>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center bg-[#F5F5F5] px-2 text-[12px] focus-within:border-b">
              <input
                type="text"
                className="grow outline-0 min-w-50"
                placeholder="What are you looking for?"
              />
              <SearchIcon />
            </div>
            <Button
              className="bg-[#F5F5F5]! rounded text-black!"
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
