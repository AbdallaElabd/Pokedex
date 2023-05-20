import { motion } from "framer-motion";
import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    // <motion.div
    //   className="absolute inset-0 flex items-center justify-center"
    //   key="loading"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    // >
    <span>Loading</span>
    // <Spinner />
    // </motion.div>
  );
}
