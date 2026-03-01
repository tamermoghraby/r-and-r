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
    <main className="flex min-h-screen flex-col bg-[#062844] overflow-x-hidden relative font-sans">
      {/* Background Texture Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]" />

      {/* TOP SECTION: The Islamic Arch & Header */}
      <div className="relative w-full h-[450px] flex items-center justify-center pt-10 px-6">
        {/* Decorative Hanging Lanterns */}
        <div className="absolute top-0 left-10 md:left-20 animate-bounce duration-[3000ms]">
          <span className="text-5xl drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
            🏮
          </span>
          <div className="w-[2px] h-20 bg-yellow-600/50 mx-auto -mt-2" />
        </div>
        <div className="absolute top-0 right-10 md:right-20 animate-bounce duration-[4000ms]">
          <span className="text-5xl drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
            🏮
          </span>
          <div className="w-[2px] h-20 bg-yellow-600/50 mx-auto -mt-2" />
        </div>

        {/* The Arch Frame */}
        <div className="relative w-full max-w-2xl h-full border-t-4 border-l-4 border-r-4 border-yellow-500/30 rounded-t-[150px] md:rounded-t-[250px] flex flex-col items-center justify-center bg-gradient-to-b from-[#084d5a] to-transparent shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
          <Image
            alt="R and R Logo"
            width={180}
            height={180}
            src={"/assets/images/randos-logo.jpg"}
            className="rounded-full border-4 border-[#fbbf24] shadow-xl mb-6"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-[#fbbf24] text-5xl md:text-7xl font-serif text-center italic drop-shadow-md">
              Ramadan Kareem
            </h1>
            <p className="text-white/60 text-center tracking-[0.4em] mt-4 uppercase text-sm">
              Deliciously Blessed
            </p>
          </motion.div>
        </div>
      </div>

      {/* MENU CONTENT SECTION */}
      <div className="relative py-8 px-4 z-20 -mt-10">
        {sections.map((section) => (
          <div key={section.title} className="mb-16">
            <motion.div>
              <div className="flex gap-4 justify-between items-center mb-10">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#fbbf24]" />
                <div className="flex items-center gap-2">
                  <span className="text-[#fbbf24]">✦</span>
                  <h2 className="text-[#fbbf24] tracking-[0.2em] text-2xl md:text-3xl font-bold uppercase">
                    {section.title}
                  </h2>
                  <span className="text-[#fbbf24]">✦</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#fbbf24]" />
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {section.data.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -5 }}>
                  <MenuItem
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />

      {/* STICKY ORDER BUTTON: Theme Matched */}
      <Link
        href={
          "https://wa.me/70381621?text=" +
          encodeURIComponent("Ramadan Kareem! I'd like to place an order.")
        }
        target="_blank"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[400px] z-50 group"
      >
        <div className="bg-gradient-to-r from-[#b45309] via-[#fbbf24] to-[#b45309] p-[2px] rounded-full shadow-[0_10px_30px_rgba(180,83,9,0.5)]">
          <div className="bg-[#062844] group-hover:bg-transparent transition-colors rounded-full py-4 px-8 flex items-center justify-center gap-3">
            <span className="text-[#fbbf24] group-hover:text-[#062844] text-xl font-bold uppercase tracking-widest transition-colors">
              Place Your Order 🌙
            </span>
          </div>
        </div>
      </Link>
    </main>
  );
}
