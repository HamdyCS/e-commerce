import { motion } from "motion/react";

export default function FieldError({ error }: { error: string }) {
  return (
    <motion.p
      key={error}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="text-red-500 select-none"
    >
      {error}
    </motion.p>
  );
}
