import Footer from "@/components/Footer";
import MenuItem from "@/components/MenuItem";
import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

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
      name: "Hotdog",
      price: "300,000",
      description:
        "Hotdog, Mozzarella, Ketchup, Mayonnaise, Barbecue, Cheddar, Sticks, Corn",
      image: "/assets/images/hotdog.jpg",
    },
    {
      name: "Ham & Cheese",
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

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-bg1 to-bg1 overflow-x-hidden">
      <div className="relative h-fit">
        <Image
          width={500}
          height={500}
          src={"/assets/images/logo.PNG"}
          className="w-full md:h-96"
        />
        <div className="h-[50%] bg-gradient-to-b from-transparent  to-bg1 absolute -bottom-[2px] left-0 right-0" />
      </div>

      <div className="py-8 px-4">
        <MotionDiv>
          <p className="text-primary  tracking-widest text-4xl font-rubik mb-4">
            KAAKE
          </p>
        </MotionDiv>
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
        <MotionDiv>
          <p className="text-primary  tracking-widest text-4xl font-rubik mt-16 mb-4">
            WRAPS
          </p>
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
        <MotionDiv>
          <p className="text-primary  tracking-widest text-4xl font-rubik mt-16 mb-4">
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
          <p className="text-primary  tracking-widest text-4xl font-rubik mt-16 mb-4">
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
        className="bg-gradient-to-br from-primary via-primary to-orange-700 font-bold p-4 rounded-xl fixed bottom-4 left-4 right-4 shadow-md shadow-primary/60 text-center text-white tracking-widest"
      >
        Order Now
      </Link>
    </main>
  );
}
