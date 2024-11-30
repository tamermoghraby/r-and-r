"use client";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="mt-4 bg-menuBottom pb-28 p-4 rounded-t-[40px] flex flex-col items-center">
      <p className="uppercase tracking-widest mb-4 text-2xl text-primary font-rubik">
        social media
      </p>
      <div className="flex items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href={"https://www.instagram.com/r.and.r.snack"}
            target={"_blank"}
          >
            <FaInstagram className="text-4xl text-white" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href={"https://www.tiktok.com/@r.and.r.snack"}
            target={"_blank"}
          >
            <FaTiktok className="text-3xl text-white" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
