import { Inter } from "next/font/google";
import { TopBar } from "@/components/top-bar";
import { cn } from "@/shared/shadcn/utils";
import type { Metadata } from "next";
import "./globals.css";


export const instant = false;

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans", 
});

export const metadata: Metadata = {
  title: "NeuroBrew",
};

export default function Layout({ children }: LayoutProps<"/">) {
  
  return (
    <html
      lang="ru"
      className={cn("dark font-sans", "font-sans", inter.variable)}
    >
      <body className="flex min-h-dvh flex-col">
        <TopBar />
        {children}
      </body>
    </html>
  );
}
