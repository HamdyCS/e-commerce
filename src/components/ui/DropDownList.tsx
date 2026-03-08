import { motion } from "motion/react";
import React, { useEffect } from "react";

interface DropDownListProps {
  list: {
    title: string;
    icon?: React.ReactNode;
    onCLick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  }[];
  className?: string;
  onOverlayClick: () => void;
}

export default function DropDownList({
  list,
  className,
  onOverlayClick,
}: DropDownListProps) {
  useEffect(() => {
    //handle escape key
    function handelEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOverlayClick();
      }
    }

    //add event listener for escape key
    document.addEventListener("keydown", handelEsc);

    //remove event listener for escape key
    return () => {
      document.removeEventListener("keydown", handelEsc);
    };
  }, []);
  return (
    <>
      <div
        className="overlay w-full h-full bg-tr fixed top-0 left-0 z-10 cursor-default"
        onClick={onOverlayClick}
      ></div>
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className={`px-4 py-2 inline-block rounded border border-white/10 bg-black/20 text-black backdrop-blur-[150px] ${className}`}
      >
        {list.map((item, index) => (
          <li
            key={index}
            onClick={(e) => item.onCLick(e)}
            className="flex items-center gap-4 cursor-pointer not-last-of-type:mb-2 hover:bg-white/20 whitespace-nowrap"
          >
            {item.icon}
            {item.title}
          </li>
        ))}
      </motion.ul>
    </>
  );
}
