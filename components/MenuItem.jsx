"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const MenuItem = ({ name, price, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group relative bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all duration-300 shadow-xl"
    >
      {/* Food Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          width={500}
          height={500}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={name}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        
        {/* Price Tag - Floating Badge Style */}
        {price && (
          <div className="absolute top-3 right-3 bg-orange-600 text-white font-black px-3 py-1 rounded-md skew-x-[-12deg] shadow-lg text-sm">
            {price} LL
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 relative">
        <h3 className="text-orange-500 font-black uppercase italic tracking-tighter text-xl mb-1 group-hover:text-white transition-colors">
          {name}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-medium">
          {description}
        </p>
        
        {/* Bottom Accent Line */}
        <div className="mt-4 h-1 w-0 bg-orange-600 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default MenuItem;