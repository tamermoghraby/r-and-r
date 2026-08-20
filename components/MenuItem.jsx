"use client";
import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare } from "lucide-react";

const MenuItem = ({
  name,
  price,
  description,
  image,
  quantity = 0,
  onAdd,
  onRemove,
  onEditNotes,
  hasNote = false,
}) => {
  const isInteractive = typeof onAdd === "function";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`group relative bg-[#1a1a1a] rounded-xl border overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between ${
        quantity > 0 ? "border-orange-500/80 shadow-[0_0_15px_rgba(234,88,12,0.15)]" : "border-white/10 hover:border-orange-500/50"
      }`}
    >
      <div>
        {/* Food Image Container */}
        <div className="relative h-60 w-full overflow-hidden">
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
            <div className="absolute top-3 right-3 bg-orange-600 text-white font-black px-3 py-1 rounded-md skew-x-[-12deg] shadow-lg text-sm z-10">
              {price} LL
            </div>
          )}

          {/* Quantity Badge on Image */}
          {quantity > 0 && (
            <div className="absolute top-3 left-3 bg-black/80 border border-orange-500 text-orange-500 font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-sm z-10 animate-bounce">
              {quantity}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 relative flex-grow">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-orange-500 font-black uppercase italic tracking-tighter text-xl group-hover:text-white transition-colors">
              {name}
            </h3>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Cart Actions or Accent Line */}
      <div className="p-4 pt-0 mt-auto">
        {isInteractive ? (
          <div className="mt-4 flex items-center gap-2 h-10">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={onAdd}
                  className="w-full h-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black uppercase text-xs tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-orange-900/20 active:scale-95"
                >
                  <Plus size={14} className="stroke-[3]" /> Add to Cart
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center w-full h-full bg-black/40 border border-orange-500/30 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={onRemove}
                    className="flex-1 h-full flex items-center justify-center hover:bg-orange-600/10 text-gray-400 hover:text-white transition-colors active:scale-90"
                  >
                    <Minus size={14} className="stroke-[2.5]" />
                  </button>
                  <span className="flex-1 text-center font-black text-orange-500 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={onAdd}
                    className="flex-1 h-full flex items-center justify-center hover:bg-orange-600/10 text-gray-400 hover:text-white transition-colors active:scale-90"
                  >
                    <Plus size={14} className="stroke-[2.5]" />
                  </button>

                  {/* Notes Button */}
                  {onEditNotes && (
                    <button
                      onClick={onEditNotes}
                      title="Add special instructions"
                      className={`h-full px-3 flex items-center justify-center border-l border-orange-500/30 transition-all ${
                        hasNote
                          ? "bg-orange-600 text-white hover:bg-orange-500"
                          : "hover:bg-orange-600/10 text-orange-500"
                      }`}
                    >
                      <div className="relative">
                        <MessageSquare size={14} className={hasNote ? "fill-white/20" : ""} />
                        {hasNote && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
                        )}
                      </div>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Bottom Accent Line for static rendering (Homepage) */
          <div className="mt-4 h-1 w-0 bg-orange-600 group-hover:w-full transition-all duration-500" />
        )}
      </div>
    </motion.div>
  );
};

export default MenuItem;