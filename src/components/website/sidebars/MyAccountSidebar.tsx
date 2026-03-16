import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function MyAccountSidebar() {
  const { t } = useTranslation();
  const [showSideBarinSmallScreen, setShowSidebarinSmallScreen] =
    useState(false);

  const sidebarElement = (
    <div className="space-y-8  ltr:border-r ltr:pr-5 rtl:border-l rtl:pl-5  border-gray-300/40  ">
      <div className="space-y-4">
        <h2 className="font-bold">{t("Manage My Account")}</h2>
        <ul className="space-y-2 rtl:pr-5 ltr:pl-5 ">
          <li>
            <NavLink
              end
              to="/my-account/profile"
              className={(x) =>
                `${x.isActive && "text-blue-500"} hover:text-hover`
              }
            >
              {t("Profile")}
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/my-account/addresses"
              className={(x) =>
                `${x.isActive && "text-blue-500"} hover:text-blue-500`
              }
            >
              {t("Addresses")}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <h2 className="font-bold">{t("My Orders")}</h2>
        <ul className="space-y-2 ltr:pl-5 rtl:pr-5 ml-auto">
          <li>
            <NavLink
              end
              to="/my-account/orders/deliverd"
              className={(x) =>
                `${x.isActive && "text-blue-500"} hover:text-blue-500`
              }
            >
              {t("Deliverd Orders")}
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/my-account/orders/returned"
              className={(x) =>
                `${x.isActive && "text-blue-500"} hover:text-blue-500`
              }
            >
              {t("Returned Orders")}
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/my-account/orders/Canceld"
              className={(x) =>
                `${x.isActive && "text-blue-500"} hover:text-blue-500`
              }
            >
              {t("Canceled Orders")}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="select-none text-nowrap">
      <FontAwesomeIcon
        icon={faBars}
        cursor={"pointer"}
        size="lg"
        className="block lg:hidden! relative z-40"
        onClick={() => setShowSidebarinSmallScreen((prev) => !prev)}
      />
      <div className="hidden lg:block">{sidebarElement}</div>
      <AnimatePresence>
        {showSideBarinSmallScreen && (
          <>
            <div
              className="overlay w-full h-full z-20 fixed top-0 left-0 right-0 bottom-0"
              onClick={() => setShowSidebarinSmallScreen(false)}
            ></div>
            <motion.div
              className="block lg:hidden absolute z-30 dark:bg-gray-900/90 bg-white/90 h-full"
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -100,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {sidebarElement}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
