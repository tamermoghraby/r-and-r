import Image from "next/image";
import Link from "next/link";

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg1 to-bg1 flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/assets/images/randos-logo.jpg"
          alt="R and R Logo"
          width={180}
          height={180}
          className="rounded-full shadow-lg"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-primary text-3xl font-rubik tracking-widest mb-8">
        Rando&apos;s LINKS
      </h1>

      {/* Links */}
      <div className="w-full max-w-sm space-y-4">
        {/* WhatsApp */}
        <Link
          href={
            "https://wa.me/70381621?text=" +
            encodeURIComponent("Hello, can I place an order?")
          }
          target="_blank"
          className="block text-center bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-md hover:opacity-95 transition"
        >
          Order on WhatsApp
        </Link>

        {/* Instagram */}
        <Link
          href="https://www.instagram.com/randos.streetfood"
          target="_blank"
          className="block text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-md hover:opacity-95 transition"
        >
          Visit Instagram
        </Link>

        {/* Tiktok */}
        {/* <Link
          href="https://instagram.com/YOUR_INSTAGRAM"
          target="_blank"
          className="block text-center bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold py-4 rounded-xl shadow-md hover:opacity-95 transition"
        >
          Visit Tiktok
        </Link> */}

        {/* Menu */}
        <Link
          href="/menu"
          className="block text-center bg-gradient-to-r from-primary to-orange-700 text-white font-bold py-4 rounded-xl shadow-md hover:opacity-95 transition"
        >
          View Menu
        </Link>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-10 tracking-wide">
        © {new Date().getFullYear()} Rando&apos;s Street Food
      </p>
    </main>
  );
}
