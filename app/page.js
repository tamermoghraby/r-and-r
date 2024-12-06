"use client";
import Footer from "@/components/Footer";
import MenuItem from "@/components/MenuItem";
import MotionDiv from "@/components/MotionDiv";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { FaRegSnowflake, FaSnowman, FaTree } from "react-icons/fa6";
import {
  TbChristmasBall,
  TbChristmasTree,
  TbChristmasTreeFilled,
} from "react-icons/tb";
import { GiColdHeart, GiWinterGloves, GiWinterHat } from "react-icons/gi";
import { motion } from "framer-motion";

export default function Home() {
  const kaakeItems = [
    {
      name: "Double Cheese",
      price: "220,000",
      description: "Mozzarella, Aakawi",
      image: "/assets/images/double-cheese.jpg",
    },
    {
      name: "Pepperoni & Cheese",
      price: "250,000",
      description: "Ketchup, Oregano, Mozzarella, Pepperoni",
      image: "/assets/images/pepperoni.jpg",
    },
    {
      name: "Mortadella & Cheese",
      price: "250,000",
      description: "Mortadella, Mozzarella, Mustard, Oregano, Olives",
      image: "/assets/images/telyeni.jpg",
    },
    {
      name: "Turkey & Cheese",
      price: "300,000",
      description: "Turkey, Mozzarella, Honey Mustard, Mayo, Corn, Iceberg",
      image: "/assets/images/turkey.jpg",
    },
    {
      name: "Nutella & Cheese",
      price: "250,000",
      description: "Nutella, Mozzarella, Banana, Honey",
      image: "/assets/images/nutella.jpg",
    },
    {
      name: "Cheese Namoura",
      price: "280,000",
      description: "Mozzarella, Namoura",
      image: "/assets/images/cheese-namoura.jpg",
    },
  ];

  const wrapItems = [
    {
      name: "Boneless Wrap",
      price: "450,000",
      description:
        "Tortilla Wrap, Mozzarella, Iceberg, Sticks, Honey Mustard, Barbecue, Ranch Sauce, Cheddar Cheese",
      image: "/assets/images/boneless.jpg",
    },
    {
      name: "Pepperoni Pizza Wrap",
      price: "350,000",
      description: "Tortilla Wrap, Pepperoni, Mozzarella, Oregano, Ketchup",
      image: "/assets/images/pizza-wrap.jpg",
    },
    {
      name: "Nutella & Cheese Wrap",
      price: "350,000",
      description: "Tortilla Wrap, Nutella, Mozzarella, Topped with Banana",
      image: "/assets/images/nutella-wrap.jpg",
    },
  ];

  const appetizers = [
    {
      name: "Fries",
      price: "150,000",
      description: "Fries + Ketchup",
      image: "/assets/images/fries.jpg",
    },
    {
      name: "Wedges",
      price: "200,000",
      description: "Wedges + Cocktail Sauce",
      image: "/assets/images/wedges.jpg",
    },
    {
      name: "Mozzarella Sticks",
      price: "280,000",
      description: "6 Pieces + Cocktail Sauce",
      image: "/assets/images/mozzarella-sticks.jpg",
    },
    {
      name: "Jalopeno Bites",
      price: "300,000",
      description: "6 Pieces + Cocktail Sauce",
      image: "/assets/images/jalopeno-bites.jpg",
    },
    {
      name: "Loaded Fries",
      price: "450,000",
      description:
        "Fries, Chicken Strips, Barbecue Sauce, Ranch Sauce, Honey Mustard, Cheddar Cheese",
      image: "/assets/images/loaded-fries.jpg",
    },
  ];

  const coldBeverages = [
    {
      name: "Soft Drinks",
      price: "60,000",
      image: "/assets/images/soft-drinks.jpg",
    },
    {
      name: "Small Water",
      price: "25,000",
      image: "/assets/images/water.jpg",
    },
  ];

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[url(https://media.istockphoto.com/id/1050695960/video/snowing.jpg?s=640x640&k=20&c=asXwRbIJn99TMTcneqjYsGy34Idakk1KFRX71y9Pjos=)] bg-cover bg-center bg-gradient-to-br from-red-600 to-red-600 overflow-x-hidden">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            // interactivity: {
            //   events: {
            //     onClick: {
            //       enable: true,
            //       mode: "push",
            //     },
            //     onHover: {
            //       enable: true,
            //       mode: "repulse",
            //     },
            //     resize: true,
            //   },
            //   modes: {
            //     push: {
            //       quantity: 4,
            //     },
            //     repulse: {
            //       distance: 200,
            //       duration: 0.4,
            //     },
            //   },
            // },
            particles: {
              color: {
                value: "#ffffff",
              },
              move: {
                direction: "bottom",
                enable: true,
                speed: { min: 3, max: 5 },
                straight: false,
              },
              number: {
                // density: {
                //   enable: true,
                //   area: 800,
                // },
                value: 80,
              },
              opacity: {
                value: { min: 0.3, max: 1 },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
          }}
        />
      )}
      <div className="relative h-fit ">
        <Image
          width={500}
          height={500}
          src={"/assets/images/logo.PNG"}
          className="w-full md:h-96"
        />
        <div className="h-[30%] bg-cover  bg-gradient-to-b from-transparent  to-red-600 absolute -bottom-[2px] left-0 right-0" />
      </div>

      <div className="py-8 px-4">
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-white  tracking-widest text-4xl font-rubik">
              KAAKE
            </p>
            <FaRegSnowflake className="text-white text-2xl animate-spin-slow" />
          </div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kaakeItems.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-evenly mt-16">
            <GiWinterGloves className="text-2xl self-center" />
            <TbChristmasBall className="text-3xl text-green-500 font-bold" />
            <FaTree className="text-8xl text-white" />
            <GiWinterHat className="text-3xl text-green-500 self-center" />
            <GiColdHeart className="text-5xl" />
          </div>
        </motion.div>
        <MotionDiv>
          <div className="flex items-center justify-between mb-4 mt-16">
            <p className="text-white tracking-widest text-4xl font-rubik">
              WRAPS
            </p>
            <FaSnowman className="text-3xl rotate-12 text-white animate-bounce" />
          </div>
        </MotionDiv>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wrapItems.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-evenly mt-16">
            <GiWinterGloves className="text-2xl self-center" />
            <FaTree className="text-3xl text-green-500" />
            <TbChristmasBall className="text-8xl text-white font-bold" />
            <GiWinterHat className="text-3xl text-green-500 self-center" />
            <GiColdHeart className="text-5xl" />
          </div>
        </motion.div>
        <MotionDiv>
          <p className="text-white  tracking-widest text-4xl font-rubik mt-16 mb-4">
            APPETIZERS
          </p>
        </MotionDiv>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {appetizers.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        <MotionDiv>
          <p className="text-white  tracking-widest text-4xl font-rubik mt-16 mb-4">
            COLD BEVERAGES
          </p>
        </MotionDiv>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {coldBeverages.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <Footer />

      <Link
        href={
          "https://wa.me/70381621?text=" +
          encodeURIComponent("Hello, can i place an order?")
        }
        target="_blank"
        className="bg-red-600 font-bold p-4 rounded-xl fixed bottom-4 left-4 right-4 shadow-md shadow-white/20 border-[1px] border-white text-center text-white tracking-widest"
      >
        Order Now
      </Link>
    </main>
  );
}
