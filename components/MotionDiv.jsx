"use client";
import React from "react";
import { motion } from "framer-motion";

const MotionDiv = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      //   viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
