import MenuItem from "@/components/MenuItem";
import Image from "next/image";
import Link from "next/link";

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
      description: "Ketshup, Oregano, Mozzarella, Peperoni",
      image: "/assets/images/pepperoni.jpg",
    },
    {
      name: "Mortadella & Cheese",
      price: "250,000",
      description: "Mortadella, Mozzarella, Mustard, Oregano, Olives",
      image: "/assets/images/telyeni.jpg",
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
        "Tortilla wrap, Iceberg, Sticks, Honey mustard, Barbecue. Cheddar cheese, Mozzarella",
      image: "/assets/images/boneless.jpg",
    },
    {
      name: "Pepperoni Pizza Wrap",
      price: "350,000",
      description: "Pepperoni, Mozzarella, Oregano, Ketchup",
      image: "/assets/images/pizza-wrap.jpg",
    },
  ];

  const appetizers = [
    {
      name: "Fries",
      price: "150,000",
      description: "Fries",
      image: "/assets/images/fries.jpg",
    },
    {
      name: "Wedges",
      price: "200,000",
      description: "Wedges",
      image: "/assets/images/wedges.jpg",
    },
    {
      name: "Jalapeno Bites",
      price: "350,000",
      description: "",
      image: "/assets/images/mozzarella-sticks.jpg",
    },
    {
      name: "Loaded Fries",
      price: "400,000",
      description:
        "Fries, Crispy, Barbecue sauce, Ranch sauce, Honey mustard, Cheddar cheese",
      image: "/assets/images/loaded-fries.jpg",
    },
  ];

  const softDrinks = [
    {
      name: "Soft Drink",
      price: "60,000",
      image: "/assets/images/soft-drinks.jpg",
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
        <p className="text-primary  tracking-widest text-4xl font-rubik mb-8">
          KAAKE
        </p>
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
        <p className="text-primary  tracking-widest text-4xl font-rubik mt-16 mb-8 ">
          WRAPS
        </p>
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
        <p className="text-primary  tracking-widest text-4xl font-rubik mt-16 mb-8">
          APPETIZERS
        </p>
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
        <p className="text-primary  tracking-widest text-4xl font-rubik mt-16 mb-8">
          SOFT DRINKS
        </p>
        <div className="grid grid-cols-2 gap-4">
          {softDrinks.map((item) => (
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
        href={"https://wa.me/70381621"}
        target="_blank"
        className="bg-gradient-to-br from-primary via-primary to-orange-700 font-bold p-4 rounded-xl fixed bottom-4 left-4 right-4 shadow-md shadow-primary/60 text-center text-white tracking-widest"
      >
        Order Now
      </Link>
    </main>
  );
}
