import Image from "next/image";
import React from "react";

const MenuItem = ({ name, price, description, image }) => {
  return (
    <div
      className="overflow-hidden bg-gradient-to-br from-menuTop to-menuBottom rounded-xl
     shadow-md shadow-primary/50 text-white"
    >
      <Image
        width={500}
        height={500}
        className="w-full h-40 object-cover object-center"
        src={image}
      />
      <div className="pb-2">
        <p className="mt-2 px-2 tracking-widest font-bold">{name}</p>
        {price && (
          <p className="mt-2 px-2 tracking-widest text-lg font-semibold">
            {price} LL
          </p>
        )}
        <p className="mt-2 px-2 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;
