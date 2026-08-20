"use client";
import Footer from "@/components/Footer";
import MenuItem from "@/components/MenuItem";
import { useToast } from "@/components/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  MapPin, 
  Utensils, 
  Store, 
  User, 
  Check, 
  Clipboard,
  PhoneCall
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MotionDiv = motion.div as any;

// Define TypeScript interfaces for our Cart Items
interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
  notes: string;
}

export default function Home() {
  const toast = useToast();

  // Menu lists
  const kaakeItems = [
    {
      name: "Double Cheese",
      price: "250,000",
      description: "Mozzarella, Cheddar",
      image: "/assets/images/double-cheese.jpg",
    },
    {
      name: "Pepperoni & Cheese",
      price: "350,000",
      description: "Ketchup, Oregano, Mozzarella, Pepperoni",
      image: "/assets/images/pepperoni-new.jpg",
    },
    {
      name: "Hotdog",
      price: "300,000",
      description:
        "Hotdog, Mozzarella, Ketchup, Mayonnaise, Cheddar, Sticks, Corn",
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
      description: "Ham, Mozzarella, Mustard, Oregano, Mayonnaise, Pickles",
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
      price: "300,000",
      description: "Nutella, Mozzarella, Banana, Honey",
      image: "/assets/images/nutella-and-cheese.jpg",
    },
    {
      name: "Cheese Namoura",
      price: "300,000",
      description: "Mozzarella, Namoura",
      image: "/assets/images/cheese-namoura.jpg",
    },
  ];

  const wrapItems = [
    {
      name: "Fajita Wrap",
      price: "600,000",
      description: "Chicken fajita, Mozzarella, Iceberg lettuce, House sauce.",
      image: "/assets/images/chicken-fajita.jpg",
    },
    {
      name: "Boneless Wrap",
      price: "500,000",
      description:
        "Tortilla Wrap, Mozzarella, Iceberg, Sticks, Honey Mustard, Barbecue, Cheddar Cheese",
      image: "/assets/images/boneless-wrap.jpg",
    },
    {
      name: "Tawook Wrap",
      price: "600,000",
      description:
        "Tortilla Wrap, Tawouk, Cheese, Iceberg, Corn, Turkey, Fries, Special rando's sauce",
      image: "/assets/images/tawook-wrap.jpg",
    },
    {
      name: "Pepperoni Pizza Wrap",
      price: "400,000",
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

  const seafoodItems = [
    {
      name: "Sea King",
      price: "600,000",
      description:
        "TGrilled Shrimp & Crab • Signature Tartar • Fresh Iceberg • Pickles",
      image: "/assets/images/crab-shrimps.jpeg",
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
      price: "550,000",
      description:
        "Fries, Chicken Strips, Barbecue Sauce, Honey Mustard, Cheddar Cheese",
      image: "/assets/images/loaded-fries-new.jpg",
    },
  ];

  const coldBeverages = [
    {
      name: "Soft Drinks",
      price: "70,000",
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
    { title: "Wraps", data: wrapItems },
    { title: "🦐 SEAFOOD SUBS", data: seafoodItems },
    { title: "Appetizers", data: appetizers },
    { title: "Cold Beverages", data: coldBeverages },
  ];

  // Cart and Modal States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [noteItemName, setNoteItemName] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState("");

  // Customer & Delivery settings states
  const [orderType, setOrderType] = useState<"delivery" | "dine_in" | "takeaway">("delivery");
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");

  // Helper: Parse string price (e.g. "300,000" -> 300000)
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/,/g, ""), 10) || 0;
  };

  // Helper: Format price value (e.g. 300000 -> "300,000")
  const formatPrice = (num: number) => {
    return num.toLocaleString();
  };

  // Cart Actions
  const addToCart = (item: { name: string; price: string; image: string }) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.name === item.name);
      if (existing) {
        return prev.map((x) =>
          x.name === item.name ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...item, quantity: 1, notes: "" }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemName: string) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.name === itemName);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        toast.info(`${itemName} removed from cart`);
        return prev.filter((x) => x.name !== itemName);
      }
      return prev.map((x) =>
        x.name === itemName ? { ...x, quantity: x.quantity - 1 } : x
      );
    });
  };

  const removeItemCompletely = (itemName: string) => {
    setCart((prev) => prev.filter((x) => x.name !== itemName));
    toast.info(`${itemName} removed from cart`);
  };

  // Handle Note Editing
  const openNoteModal = (itemName: string) => {
    const item = cart.find((x) => x.name === itemName);
    setNoteItemName(itemName);
    setTempNoteText(item ? item.notes : "");
  };

  const saveNote = () => {
    if (!noteItemName) return;
    setCart((prev) =>
      prev.map((x) =>
        x.name === noteItemName ? { ...x, notes: tempNoteText } : x
      )
    );
    toast.success(`Note updated for ${noteItemName}`);
    setNoteItemName(null);
    setTempNoteText("");
  };

  const addPresetToNote = (presetText: string) => {
    setTempNoteText((prev) => {
      if (!prev) return presetText;
      if (prev.toLowerCase().includes(presetText.toLowerCase())) return prev;
      return `${prev}, ${presetText}`;
    });
  };

  // Pricing calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Quick suggestion tags based on current item category / content
  const getNotePresets = (itemName: string) => {
    const name = itemName.toLowerCase();
    if (name.includes("kaake")) {
      return ["Extra Cheese", "Well Baked", "No Pickles", "No Mayo", "Add Hotdog"];
    }
    if (name.includes("wrap")) {
      return ["No Onions", "Extra Sauce", "Spicy", "Toasted Wrap", "No Mayo"];
    }
    if (name.includes("fries") || name.includes("wedges")) {
      return ["Extra Ketchup", "Well Crispy", "Sauce on side", "No salt"];
    }
    return ["No Tomato", "Extra Sauce", "Spicy", "No Onions", "Mayo on side"];
  };

  // Build WhatsApp Message Link
  const handleCheckout = () => {
    if (!customerName.trim()) {
      toast.error("Please enter your name to complete the order.");
      return;
    }
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      toast.error("Please enter a delivery address.");
      return;
    }

    // Build the invoice layout for WhatsApp
    let message = `*🔥 NEW ORDER - RANDO'S STREET FOOD 🔥*\n`;
    message += `----------------------------------------\n`;
    message += `👤 *Client Name:* ${customerName.trim()}\n`;
    message += `📋 *Order Type:* ${
      orderType === "delivery"
        ? "Delivery 🚗"
        : orderType === "dine_in"
        ? "Dine-In 🍽️"
        : "Takeaway 🛍️"
    }\n`;

    if (orderType === "delivery") {
      message += `📍 *Delivery Address:* ${deliveryAddress.trim()}\n`;
    }

    if (generalNotes.trim()) {
      message += `💬 *Notes:* ${generalNotes.trim()}\n`;
    }

    message += `----------------------------------------\n`;
    message += `*🛒 ITEMS ORDERED:*\n\n`;

    cart.forEach((item, idx) => {
      const itemSubtotal = parsePrice(item.price) * item.quantity;
      message += `${idx + 1}️⃣ *${item.name}* (x${item.quantity})\n`;
      message += `   • Price: ${item.price} LL\n`;
      message += `   • Total: ${formatPrice(itemSubtotal)} LL\n`;
      if (item.notes.trim()) {
        message += `   • 📝 *Item Notes:* ${item.notes.trim()}\n`;
      }
      message += `\n`;
    });

    message += `----------------------------------------\n`;
    message += `*💰 GRAND TOTAL:* ${formatPrice(subtotal)} LL\n`;
    message += `----------------------------------------\n`;
    message += `_Thank you for choosing Rando's!_`;

    const encodedText = encodeURIComponent(message);
    // Lebanon country code added for direct contact reliability
    const whatsappLink = `https://wa.me/96170381621?text=${encodedText}`;

    window.open(whatsappLink, "_blank");
    toast.success("Redirecting to WhatsApp to send your order...");
  };

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
          <MotionDiv
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-orange-500 blur-2xl opacity-20 animate-pulse"></div>
            <Image
              alt="Rando's Street Food Logo"
              width={200}
              height={200}
              src={"/assets/images/randos-logo.jpg"}
              className="relative rounded-2xl border-2 border-orange-500/50 shadow-2xl mb-6"
            />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-center block">
              <h1 className="text-orange-500 text-6xl md:text-8xl font-black italic tracking-tighter uppercase font-rubik">
                RANDO&apos;S
              </h1>
              <p className="text-white font-bold tracking-[0.4em] uppercase text-xs md:text-sm opacity-80">
                Street Food • Hot & Fresh
              </p>
            </span>
          </MotionDiv>
        </div>
      </div>

      {/* MENU GRID */}
      <div className="relative py-4 px-4 z-20 max-w-6xl mx-auto w-full mb-28">
        {sections.map((section) => (
          <div key={section.title} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-white text-2xl md:text-4xl font-black uppercase italic skew-x-[-10deg] border-l-4 border-orange-600 pl-4">
                {section.title}
              </h2>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.data.map((item) => {
                const cartItem = cart.find((x) => x.name === item.name);
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                  <MenuItem
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                    quantity={quantity}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item.name)}
                    onEditNotes={() => openNoteModal(item.name)}
                    hasNote={!!cartItem?.notes}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Footer />

      {/* FLOATING ACTION CART TRIGGER BUTTON */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4 transition-all hover:scale-105 active:scale-95">
        <AnimatePresence mode="wait">
          {totalQty > 0 ? (
            <MotionDiv
              key="cart-active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-full">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white p-4 rounded-full flex items-center justify-between shadow-[0_10px_35px_rgba(234,88,12,0.4)] border border-white/20 active:scale-95 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white">
                      {totalQty}
                    </div>
                    <span className="font-black uppercase tracking-wider text-xs md:text-sm">
                      View Your Order
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm md:text-base">
                      {formatPrice(subtotal)} LL
                    </span>
                    <span className="text-lg">➔</span>
                  </div>
                </button>
              </div>
            </MotionDiv>
          ) : (
            <MotionDiv
              key="cart-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-full">
                <Link
                  href={
                    "https://wa.me/70381621?text=" +
                    encodeURIComponent("Hi Rando's! I'd like to place an order.")
                  }
                  target="_blank"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(234,88,12,0.5)] border border-white/20 text-center font-black uppercase tracking-wider text-xs md:text-sm whitespace-nowrap block"
                >
                  <span className="text-xl">🔥</span>
                  <span>Order Now: 70 381 621</span>
                </Link>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>

      {/* SIDE CART DRAWER (SLIDE-OVER) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop Blur overlay */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
            />

            {/* Main Drawer Container */}
            <MotionDiv
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#121212] z-50 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-orange-500" size={22} />
                  <h3 className="font-black text-lg uppercase tracking-tight italic">
                    Your Order
                  </h3>
                  <span className="bg-orange-600/20 text-orange-400 font-bold px-2 py-0.5 text-xs rounded-full ml-2">
                    {totalQty} Items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body (Scrollable items) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-orange-500/20 flex items-center justify-center mb-4 text-orange-500 opacity-60">
                      <ShoppingBag size={28} />
                    </div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">
                      Your cart is looking hungry!
                    </p>
                    <p className="text-gray-500 text-xs max-w-[250px]">
                      Add some hot & fresh items from the menu to build your order.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-4">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                        Cart items
                      </h4>
                      {cart.map((item) => (
                        <div
                          key={item.name}
                          className="bg-white/5 border border-white/5 rounded-xl p-3 flex gap-3 relative hover:border-orange-500/20 transition-all"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div className="flex-grow min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h5 className="font-bold text-sm text-white truncate pr-4">
                                  {item.name}
                                </h5>
                                <span className="font-black text-xs text-orange-500">
                                  {formatPrice(
                                    parsePrice(item.price) * item.quantity
                                  )}{" "}
                                  LL
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-400">
                                {item.price} LL each
                              </p>
                            </div>

                            {/* Item Notes link / summary */}
                            <button
                              onClick={() => openNoteModal(item.name)}
                              className="text-left text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 mt-1 bg-orange-500/5 hover:bg-orange-500/10 px-2 py-0.5 rounded w-fit transition-colors"
                            >
                              <MessageSquare size={10} />
                              {item.notes ? (
                                <span className="truncate max-w-[180px] italic">
                                  &quot;{item.notes}&quot;
                                </span>
                              ) : (
                                <span>Add custom notes...</span>
                              )}
                            </button>
                          </div>

                          {/* Item Quantity Controller / Trash */}
                          <div className="flex flex-col items-end justify-between border-l border-white/5 pl-3 ml-1">
                            <button
                              onClick={() => removeItemCompletely(item.name)}
                              className="text-gray-500 hover:text-red-500 p-1 rounded hover:bg-red-500/5 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 size={14} />
                            </button>

                            <div className="flex items-center bg-black/40 border border-white/10 rounded-md overflow-hidden h-7 mt-2">
                              <button
                                onClick={() => removeFromCart(item.name)}
                                className="px-2 h-full flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-2 text-center text-xs font-bold text-orange-500">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addToCart(item)}
                                className="px-2 h-full flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Preferences (Dine-in, delivery, etc) */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Utensils size={14} className="text-orange-500" />
                        Order Preferences
                      </h4>

                      {/* Order Type Toggle */}
                      <div className="grid grid-cols-3 bg-zinc-900 border border-white/5 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setOrderType("delivery")}
                          className={`flex flex-col items-center gap-1 py-2 text-xs rounded-lg transition-all font-bold ${
                            orderType === "delivery"
                              ? "bg-orange-600 text-white shadow-md shadow-orange-900/30"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-base">🚗</span>
                          Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType("takeaway")}
                          className={`flex flex-col items-center gap-1 py-2 text-xs rounded-lg transition-all font-bold ${
                            orderType === "takeaway"
                              ? "bg-orange-600 text-white shadow-md shadow-orange-900/30"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-base">🛍️</span>
                          Takeaway
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType("dine_in")}
                          className={`flex flex-col items-center gap-1 py-2 text-xs rounded-lg transition-all font-bold ${
                            orderType === "dine_in"
                              ? "bg-orange-600 text-white shadow-md shadow-orange-900/30"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          <span className="text-base">🍽️</span>
                          Dine-In
                        </button>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                        {/* Name Input (Always needed) */}
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                            Your Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              placeholder="Enter your name"
                              className="w-full bg-zinc-950 border border-white/10 rounded-lg py-2 px-3 pl-8 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                            />
                            <User
                              size={12}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                          </div>
                        </div>

                        {/* Conditionals */}
                        {orderType === "delivery" && (
                          <div className="animate-toast-in">
                            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                              Delivery Address *
                            </label>
                            <div className="relative">
                              <textarea
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                rows={2}
                                placeholder="Enter street name, building, floor, landmark etc."
                                className="w-full bg-zinc-950 border border-white/10 rounded-lg py-2 px-3 pl-8 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                              />
                              <MapPin
                                size={12}
                                className="absolute left-2.5 top-3 text-gray-500"
                              />
                            </div>
                          </div>
                        )}

                        {/* General Notes */}
                        <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                            Notes
                          </label>
                          <textarea
                            value={generalNotes}
                            onChange={(e) => setGeneralNotes(e.target.value)}
                            rows={2}
                            placeholder="e.g. Bring food hot, send drinks cold, extra napkins..."
                            className="w-full bg-zinc-950 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer (Checkout button) */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-white/10 bg-zinc-950/60 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">
                      Subtotal
                    </span>
                    <span className="font-black text-white text-base">
                      {formatPrice(subtotal)} LL
                    </span>
                  </div>

                  {orderType === "delivery" && (
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mt-[-8px]">
                      <span>Delivery Fee</span>
                      <span>Calculated at delivery</span>
                    </div>
                  )}

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-950/40 active:scale-95 transition-all"
                  >
                    <span>Send Order to WhatsApp</span>
                    <span className="text-base">🚀</span>
                  </button>
                </div>
              )}
            </MotionDiv>
          </>
        )}
      </AnimatePresence>

      {/* ITEM NOTE MODAL */}
      <AnimatePresence>
        {noteItemName && (
          <>
            {/* Modal Backdrop overlay */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setNoteItemName(null);
                setTempNoteText("");
              }}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
            />

            {/* Modal Content Box */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
              <MotionDiv
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#18181b] border border-orange-500/20 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black uppercase tracking-tight text-orange-500 text-base italic">
                    Add Instructions
                  </h4>
                  <button
                    onClick={() => {
                      setNoteItemName(null);
                      setTempNoteText("");
                    }}
                    className="w-7 h-7 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-zinc-800 text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                <p className="text-gray-300 text-xs font-semibold mb-3">
                  Specify preferences for:{" "}
                  <span className="text-white font-black text-sm uppercase">
                    {noteItemName}
                  </span>
                </p>

                {/* Textarea */}
                <textarea
                  value={tempNoteText}
                  onChange={(e) => setTempNoteText(e.target.value)}
                  rows={3}
                  maxLength={150}
                  placeholder="e.g. Extra ketchup, no pickles, cut kaake in two..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors resize-none mb-4"
                />

                {/* Quick Presets Section */}
                <div className="mb-6">
                  <span className="text-[10px] text-gray-500 uppercase font-bold block mb-2">
                    Quick Suggestion Badges
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {getNotePresets(noteItemName).map((preset) => (
                      <button
                        key={preset}
                        onClick={() => addPresetToNote(preset)}
                        className="bg-zinc-900 border border-white/5 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 text-[10px] py-1 px-2.5 rounded-full font-bold transition-all active:scale-95"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => {
                      setNoteItemName(null);
                      setTempNoteText("");
                    }}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNote}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase text-xs tracking-wider rounded-lg flex items-center gap-1 shadow-md shadow-orange-950/20 active:scale-95 transition-all"
                  >
                    <Check size={12} className="stroke-[3]" /> Save Note
                  </button>
                </div>
              </MotionDiv>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

