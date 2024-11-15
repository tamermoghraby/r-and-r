import { Inter, Rubik_Gemstones } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const rubikGemstones = Rubik_Gemstones({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik",
});

export const metadata = {
  title: "R and R Menu",
  description: "Discover our top menu items at R and R!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${rubikGemstones.variable}`}>
        {children}
      </body>
    </html>
  );
}
