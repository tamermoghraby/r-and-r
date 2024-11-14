import MenuItem from "@/components/MenuItem";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const kaakeItems = [
    {
      name: "Double Cheese",
      price: "200,000",
      description: "Mozarella, Aakawi",
      image: "/assets/images/double-cheese.jpg",
    },
    {
      name: "Pepperoni & Cheese",
      price: "250,000",
      description: "Ketshup, Oregano, Mozarella, Peperoni",
      image: "/assets/images/pepperoni.jpg",
    },
    {
      name: "Mortadella & Cheese",
      price: "250,000",
      description: "Mortadella, Mozarella, Mustard, Oregano, Olives",
      image: "/assets/images/telyeni.jpg",
    },
    {
      name: "Cheese Namoura",
      price: "250,000",
      description: "Mozarella, Namoura",
      image: "/assets/images/cheese-namoura.jpg",
    },
  ];

  const wrapItems = [
    {
      name: "Boneless Wrap",
      price: "400,000",
      description:
        "Tortilla wrap, Iceberg, Sticks, Honey mustard, Barbecue. Cheddar cheese, Mozarella",
      image: "/assets/images/boneless.jpg",
    },
    {
      name: "Pepperoni Pizza Wrap",
      price: "350,000",
      description: "Pepperoni, Mozarella, Oregano, Ketchup",
      image: "/assets/images/pizza-wrap.jpg",
    },
  ];

  const appetizers = [
    {
      name: "Loaded Fries",
      price: "400,000",
      description: "",
      image: "/assets/images/loaded-fries.jpg",
    },
  ];

  const owners = [
    {
      name: "Ramrouumm",
      image: "/assets/images/rami.jpg",
    },
    {
      name: "Ritchyyy",
      image: "/assets/images/rashad.jpg",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-bg1 to-bg1/80">
      <Image
        width={500}
        height={500}
        src={"/assets/images/logo.PNG"}
        className="w-full"
      />
      <div className="p-8 mb-16">
        <p className="text-primary  tracking-widest text-4xl font-rubik mb-8">
          KAAKE
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
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
        <div className="grid grid-cols-2 gap-8">
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
          OWNERS
        </p>
        <div className="grid grid-cols-2 gap-8">
          {owners.map((item) => (
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
        className="bg-gradient-to-br from-primary via-primary to-orange-700 font-bold p-4 rounded-xl fixed bottom-0 w-full text-center"
      >
        Order Now
      </Link>
    </main>
  );
}
