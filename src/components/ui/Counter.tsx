import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface CounterProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}
export default function Counter({ min, max, value, onChange }: CounterProps) {
  const [count, setCount] = useState(value);
  return (
    <div className="flex items-center flex-nowrap border rounded-sm overflow-hidden w-fit">
      <div
        className="cursor-pointer  py-2 px-4"
        onClick={() => {
          const newCount = count > min ? count - 1 : count;
          setCount(newCount);
          onChange(newCount);
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </div>
      <p className="px-10 py-2 border-x select-none">{count}</p>
      <div
        className="bg-red-500 py-2 px-4  cursor-pointer text-white"
        onClick={() => {
          const newCount = count < max ? count + 1 : count;
          setCount(newCount);
          onChange(newCount);
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}
