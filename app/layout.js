import {
  Inter,
  Rubik_Gemstones,
  Rubik_Distressed,
  Knewave,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const rubikGemstones = Rubik_Gemstones({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-rubik",
});

const rubikPuddles = Knewave({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-rubikpuddles",
});

export const metadata = {
  title: "R & R Menu",
  description: "Discover our top menu items at R and R!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${rubikGemstones.variable} ${rubikPuddles.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
