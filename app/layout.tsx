import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Configure Outfit font
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"], // Varied weights for bold designs
});

export const metadata: Metadata = {
  title: "Bhukkad Dosa | Lucknow's Revolutionary Dosa",
  description: "Experience the crunchiest, tastiest Dosa in Lucknow. A revolutionary taste awaits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-background text-foreground`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
