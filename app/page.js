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
      price: "300,000",
      description: "Ketchup, Oregano, Mozzarella, Pepperoni",
      image: "/assets/images/pepperoni-new.jpg",
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
      price: "300,000",
      description: "Ham, Mozzarella, Mustard, Oregano, Olives",
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
    // {
    //   name: "Hotdog Wrap",
    //   price: "450,000",
    //   description:
    //     "Tortilla wrap, Hotdog, Mozzarella, Chips, Ketchup, Mayonnaise, Mustard, Barbecue, Cheddar, Corn",
    //   image: "/assets/images/hotdog-wrap.jpg",
    // },
    {
      name: "Burger Wrap",
      price: "450,000",
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
      price: "150,000",
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
      price: "450,000",
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
    },
    {
      name: "Small Water",
      price: "20,000",
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
          <div className="flex gap-4 justify-between items-center">
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4" />
            <p className="text-primary  tracking-widest text-4xl font-rubik mb-4">
              KAAKE
            </p>
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4" />
          </div>
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
          <div className="flex gap-4 justify-between items-center">
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4 mt-16" />
            <p className="text-primary  tracking-widest text-4xl font-rubik mb-4 mt-16">
              WRAPS
            </p>
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4 mt-16" />
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
        <MotionDiv>
          <div className="flex gap-4 justify-between items-center">
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4 mt-16" />
            <p className="text-primary  tracking-widest text-4xl font-rubik mb-4 mt-16">
              APPETIZERS
            </p>
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4 mt-16" />
          </div>
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
          <div className="flex gap-4 justify-between items-center">
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4 mt-16" />
            <p className="text-primary  tracking-widest text-4xl font-rubik mb-4 mt-16">
              COLD BEVERAGES
            </p>
            <div className="flex-1 border-t-2 border-primary border-dotted mb-4 mt-16" />
          </div>
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
        className="bg-gradient-to-br from-primary via-primary to-orange-700 font-bold p-4 rounded-xl fixed bottom-4 left-4 right-4 shadow-md shadow-primary/60 text-center text-white tracking-widest hover:opacity-95"
      >
        Order Now
      </Link>
    </main>
  );
}
