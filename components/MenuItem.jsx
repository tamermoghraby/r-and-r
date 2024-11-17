"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const MenuItem = ({ name, price, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      // viewport={{ once: true }}
      className="overflow-hidden bg-gradient-to-br from-menuTop to-menuBottom rounded-xl
     shadow-md shadow-primary/50 text-white"
    >
      <Image
        width={500}
        height={500}
        className="w-full h-40 object-cover object-center rounded-b-xl"
        src={image}
      />
      <div className="pb-2 rounded-t-xl pt-2 px-2">
        <p className="tracking-widest text-sm uppercase min-h-10">{name}</p>
        {price && (
          <p className=" tracking-widest text-xl font-bold mt-2">{price} LL</p>
        )}
        <p className="mt-2 font-light text-xs text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default MenuItem;
