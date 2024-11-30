"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const MenuItem = ({ name, price, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.8 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      // viewport={{ once: true }}
      className="overflow-hidden bg-gradient-to-br from-menuBottom to-menuBottom rounded-xl
     shadow-md shadow-primary/50 text-white"
    >
      <div className="relative">
        <Image
          width={500}
          height={500}
          className="w-full h-40 object-cover object-center rounded-b-xl"
          src={image}
        />
        <div className="h-[20%] absolute -bottom-[2px] right-0 left-0 bg-gradient-to-b from-transparent via-menuBottom/90 to-menuBottom">
          <p className="text-center mt-4 tracking-wider text-md uppercase ">
            {name}
          </p>
        </div>
      </div>
      <div className="pb-2 rounded-t-xl pt-4 px-2">
        {/* <p className="tracking-widest text-sm uppercase min-h-10">{name}</p> */}
        {price && (
          <p className=" tracking-widest text-xl font-bold mt-6">{price} LL</p>
        )}
        <p className="mt-2 font-light text-xs text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default MenuItem;
