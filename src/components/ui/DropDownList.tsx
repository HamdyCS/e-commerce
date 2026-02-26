import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface DropDownListProps {
  list: {
    title: string;
    icon?: React.ReactNode;
    onCLick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  }[];
}

export default function DropDownList({ list }: DropDownListProps) {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="px-4 py-2 inline-block rounded border border-white/10 bg-black/20 text-black backdrop-blur-[150px]"
      >
        {list.map((item, index) => (
          <li
            key={index}
            onClick={(e) => item.onCLick(e)}
            className="flex items-center gap-1 cursor-pointer not-last-of-type:mb-2 hover:bg-white/20"
          >
            {item.title}
            {item.icon}
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
