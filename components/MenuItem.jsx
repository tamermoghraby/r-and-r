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
    </div>
  );
};

export default MenuItem;
