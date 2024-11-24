import MenuItem from "@/components/MenuItem";
import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  const kaakeItems = [
    {
      name: "Double Cheese",
      price: "200,000",
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
      price: "250,000",
      description: "Mozzarella, Namoura",
      image: "/assets/images/cheese-namoura.jpg",
    },
  ];

  const wrapItems = [
    {
      name: "Boneless Wrap",
      price: "400,000",
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
      price: "350,000",
      description: "6 Pieces + Cocktail Sauce",
      image: "/assets/images/mozzarella-sticks.jpg",
    },
    {
      name: "Jalopeno Bites",
      price: "350,000",
      description: "6 Pieces + Cocktail Sauce",
      image: "/assets/images/jalopeno-bites.jpg",
    },
    {
      name: "Loaded Fries",
      price: "400,000",
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
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-bg1 to-bg1/80 overflow-x-hidden">
      <Image
        width={500}
        height={500}
        src={"/assets/images/logo.PNG"}
        className="w-full"
      />
      <div className="py-8 px-4 mb-16">
        <MotionDiv>
          <p className="text-primary  tracking-widest text-4xl font-rubik mb-4">
            KAAKE
          </p>
        </MotionDiv>
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
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
