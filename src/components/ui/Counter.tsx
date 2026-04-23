import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CounterProps {
  min: number;
  max: number;
  disabledMinus?: boolean;
  disabledPlus?: boolean;
  value: number;
  loading?: boolean;
  onChange: (value: number) => void;
}
export default function Counter({
  min,
  max,
  value,
  onChange,
  loading,
  disabledMinus,
  disabledPlus,
}: CounterProps) {
  const [count, setCount] = useState(value);

  return (
    <div className="flex items-center flex-nowrap border rounded-sm overflow-hidden w-50">
      <button
        className="cursor-pointer  py-2 px-4 disabled:cursor-not-allowed disabled:bg-gray-500 grow"
        onClick={() => {
          const newCount = count > min ? count - 1 : count;
          setCount(newCount);
          onChange(newCount);
        }}
        disabled={count === min || loading || disabledMinus}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      {loading ? (
        <div className="px-10 py-2">
          <div className="w-5 h-5  animate-spin rounded-full border-2 border-t-transparent border-white" />
        </div>
      ) : (
        <p className="px-10 py-2 border-x select-none">{count}</p>
      )}
      <button
        className="bg-red-500 py-2 px-4  cursor-pointer text-white disabled:cursor-not-allowed disabled:bg-gray-500 grow"
        onClick={() => {
          const newCount = count < max ? count + 1 : count;
          setCount(newCount);
          onChange(newCount);
        }}
        disabled={count === max || loading || disabledPlus}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
