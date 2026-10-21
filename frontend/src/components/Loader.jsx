import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          <motion.h1
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish, حركة ناعمة جدًا
            }}
            className="text-3xl md:text-4xl font-bold text-lime-500 mb-6"
          >
            Shams Store
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-12 h-12 border-4 border-lime-500/30 border-t-lime-500 rounded-full animate-spin"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;