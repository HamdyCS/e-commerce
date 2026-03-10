import {
  faBagShopping,
  faCircleUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import DropDownList from "../../ui/DropDownList";
import ToggleTheme from "../../theme/ToggleTheme";

export default function Navbar() {
  const [showLanguageList, setShowLanguageList] = useState(false);
  const [showAccountList, setShowAccountList] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);
    document.documentElement.dir = i18n.dir();
    setShowLanguageList(false);
  }

  return (
    <div>
      <div className=" bg-black dark:bg-primary-card-dark-bg select-none">
        <div className="container px-2 py-4 mx-auto text-white">
          <div className="relative justify-self-end flex items-center gap-2">
            <ToggleTheme />
            <div
              className=" flex items-center gap-1 cursor-pointer"
              onClick={() => setShowLanguageList((prev) => !prev)}
            >
              <p>{i18n.language === "en" ? "English" : "العربية"}</p>
              <KeyboardArrowDownIcon
                className="text-white "
                style={{
                  transform: showLanguageList
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </div>
            <AnimatePresence>
              {showLanguageList && (
                <DropDownList
                  onOverlayClick={() => setShowLanguageList(false)}
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
                  className="absolute top-10 -left-1.25 z-50"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="border-b border-b-black/10 dark:border-b-white/10">
        <div className="container mx-auto px-2 py-5 flex items-center justify-between gap-5 flex-wrap">
          <NavLink
            to="/"
            className="font-bold text-2xl cursor-pointer hover:text-blue-500 transition-colors"
          >
            E-Commerce
          </NavLink>
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
            {!user && (
              <>
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
              </>
            )}
          </div>
          <div className="flex items-center justify-between  grow lg:grow-0  gap-2">
            <div className="flex gap-2 items-center bg-[#F5F5F5] dark:bg-transparent px-2 text-[12px] focus-within:border-b">
              <input
                type="text"
                className="grow outline-0 min-w-50"
                placeholder={t("What are you looking for?")}
              />
              <SearchIcon />
            </div>
            {user && (
              <div className="cursor-pointer relative select-none">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="xl"
                  color="red"
                  className="hover:text-blue-500 relative z-20"
                  onClick={() => setShowAccountList((prev) => !prev)}
                />
                <AnimatePresence>
                  {showAccountList && (
                    <DropDownList
                      onOverlayClick={() => setShowAccountList(false)}
                      list={[
                        {
                          title: t("Manage My Account"),
                          onCLick: () => {
                            navigate("/my-account");
                            setShowAccountList(false);
                          },
                          icon: <FontAwesomeIcon icon={faCircleUser} />,
                        },
                        {
                          title: t("My Orders"),
                          onCLick: () => {},
                          icon: <FontAwesomeIcon icon={faBagShopping} />,
                        },
                        {
                          title: t("My Addresses"),
                          onCLick: () => {},
                          icon: <FontAwesomeIcon icon={faLocationDot} />,
                        },
                        {
                          title: t("Logout"),
                          onCLick: () => {},
                          icon: <FontAwesomeIcon icon={faCircleUser} />,
                        },
                      ]}
                      className="absolute top-8 right-0 z-10 "
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
