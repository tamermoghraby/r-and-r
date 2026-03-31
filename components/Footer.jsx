"use client";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-gradient-to-t from-black to-[#1a1a1a] pb-32 pt-12 px-4 border-t border-white/5 flex flex-col items-center">
      {/* Decorative Fire Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-orange-600 to-transparent" />

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="uppercase tracking-[0.3em] mb-8 text-xl text-orange-500 font-black italic skew-x-[-10deg]"
      >
        Follow the Heat
      </motion.h3>

      <div className="flex items-center gap-10">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://www.instagram.com/r.and.r.snack"
            target="_blank"
            className="block p-3 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
          >
            <FaInstagram className="text-3xl text-white group-hover:text-orange-500" />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, rotate: -5 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://www.tiktok.com/@r.and.r.snack"
            target="_blank"
            className="block p-3 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all"
          >
            <FaTiktok className="text-3xl text-white" />
          </Link>
        </motion.div>
      </div>

      <p className="mt-12 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
        Rando's Street Food • Kafar Selouan
      </p>
    </footer>
  );
};

export default Footer;
