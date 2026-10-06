import { Inter } from "next/font/google";
import { cn } from "@/common/lib/utils";
import { TopBar } from "@/modules/top-bar";
import type { Metadata } from "next";
import "./globals.css";


const inter = Inter({ subsets:["latin"],variable:"--font-sans" });

export const metadata: Metadata = {
  title: "NeuroBrew",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={cn("dark font-sans", inter.variable)}>
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
