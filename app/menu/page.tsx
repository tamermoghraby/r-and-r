"use client";
import Footer from "@/components/Footer";
import MenuItem from "@/components/MenuItem";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const kaakeItems = [
    {
      name: "Double Cheese",
      price: "250,000",
      description: "Mozzarella, Aakawi",
      image: "/assets/images/double-cheese.jpg",
    },
    {
      name: "Pepperoni & Cheese",
      price: "300,000",
      description: "Ketchup, Oregano, Mozzarella, Pepperoni",
      image: "/assets/images/pepperoni-new.jpg",
    },
    {
      name: "Hotdog",
      price: "300,000",
      description:
        "Hotdog, Mozzarella, Ketchup, Mayonnaise, Barbecue, Cheddar, Sticks, Corn",
      image: "/assets/images/hotdog-new.jpg",
    },
    {
      name: "Sojok",
      price: "350,000",
      description: "Sojok, Cheese, Tomato, Pickles, Mayonnaise",
      image: "/assets/images/sujok.jpg",
    },
    {
      name: "Ham & Cheese",
      price: "300,000",
      description: "Ham, Mozzarella, Mustard, Oregano, Olives",
      image: "/assets/images/ham-and-cheese.jpg",
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
      image: "/assets/images/nutella-and-cheese.jpg",
    },
    {
      name: "Cheese Namoura",
      price: "250,000",
      description: "Mozzarella, Namoura",
      image: "/assets/images/cheese-namoura.jpg",
    },
  ];

  const wrapItems = [
    {
      name: "Fajita Wrap",
      price: "550,000",
      description: "Chicken fajita, Mozzarella, Iceberg lettuce, House sauce.",
      image: "/assets/images/chicken-fajita.jpg",
    },
    {
      name: "Boneless Wrap",
      price: "500,000",
      description:
        "Tortilla Wrap, Mozzarella, Iceberg, Sticks, Honey Mustard, Barbecue, Ranch Sauce, Cheddar Cheese",
      image: "/assets/images/boneless-wrap.jpg",
    },
    {
      name: "Tawook Wrap",
      price: "550,000",
      description:
        "Tortilla Wrap, Tawouk, Cheese, Iceberg, Corn, Turkey, Fries, Special randr sauce",
      image: "/assets/images/tawook-wrap.jpg",
    },
    {
      name: "Pepperoni Pizza Wrap",
      price: "350,000",
      description: "Tortilla Wrap, Pepperoni, Mozzarella, Oregano, Ketchup",
      image: "/assets/images/pizza-wrap-new.jpg",
    },
    {
      name: "Burger Wrap",
      price: "500,000",
      description:
        "Tortilla Wrap, 2 Burger patty, Fries, Mozzarella, Iceberg, Tomato, Kethup, Cocktail Sauce",
      image: "/assets/images/burger-new.jpg",
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
      price: "200,000",
      description: "Fries + Ketchup",
      image: "/assets/images/fries.jpg",
    },
    {
      name: "Wedges",
      price: "200,000",
      description: "Wedges + Cocktail Sauce",
      image: "/assets/images/wedges-new.jpg",
    },
    {
      name: "Mozzarella Sticks",
      price: "300,000",
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
      price: "500,000",
      description:
        "Fries, Chicken Strips, Barbecue Sauce, Ranch Sauce, Honey Mustard, Cheddar Cheese",
      image: "/assets/images/loaded-fries-new.jpg",
    },
  ];

  const coldBeverages = [
    {
      name: "Soft Drinks",
      price: "50,000",
      image: "/assets/images/soft-drinks.jpg",
      description: "Pepsi, 7Up, Mirinda",
    },
    {
      name: "Small Water",
      price: "20,000",
      image: "/assets/images/water.jpg",
      description: "Water Bottle 330ml",
    },
  ];

  const sections = [
    { title: "Kaake", data: kaakeItems },
    { title: "Ramadan Wraps", data: wrapItems },
    { title: "Appetizers", data: appetizers },
    { title: "Cold Beverages", data: coldBeverages },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0f0f0f] overflow-x-hidden relative font-sans text-white">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-900/20 via-transparent to-black pointer-events-none" />

      {/* HERO SECTION */}
      <div className="relative w-full h-[450px] flex items-center justify-center pt-10 px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-600 rounded-full blur-[100px] animate-pulse opacity-20" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600 rounded-full blur-[120px] animate-pulse delay-700 opacity-20" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            // className="relative"
          >
            <div className="absolute inset-0 rounded-2xl bg-orange-500 blur-2xl opacity-20 animate-pulse"></div>
            <Image
              alt="Rando's Street Food Logo"
              width={200}
              height={200}
              src={"/assets/images/randos-logo.jpg"}
              className="relative rounded-2xl border-2 border-orange-500/50 shadow-2xl mb-6"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}

            // className="text-center"
          >
            <span className="text-center">
              <h1 className="text-orange-500 text-6xl md:text-8xl font-black italic tracking-tighter uppercase">
                RANDO&apos;S
              </h1>
              <p className="text-white font-bold tracking-[0.4em] uppercase text-xs md:text-sm opacity-80">
                Street Food • Hot & Fresh
              </p>
            </span>
          </motion.div>
        </div>
      </div>

      {/* MENU GRID */}
      <div className="relative py-4 px-4 z-20 max-w-6xl mx-auto w-full">
        {sections.map((section) => (
          <div key={section.title} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-white text-2xl md:text-4xl font-black uppercase italic skew-x-[-10deg] border-l-4 border-orange-600 pl-4">
                {section.title}
              </h2>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.data.map((item) => (
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
        ))}
      </div>

      <Footer />

      {/* REFINED FLOATING ACTION BUTTON */}
      <Link
        href={
          "https://wa.me/70381621?text=" +
          encodeURIComponent("Hi Rando's! I'd like to place an order.")
        }
        target="_blank"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all hover:scale-105 active:scale-95"
      >
        <div className="bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(234,88,12,0.5)] border border-white/20">
          <span className="text-xl">🔥</span>
          <span className="font-black uppercase tracking-wider text-sm md:text-base whitespace-nowrap">
            Order Now: 70 381 621
          </span>
        </div>
      </Link>
    </main>
  );
}
