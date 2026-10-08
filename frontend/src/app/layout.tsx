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
    <html lang="ru" className={cn("dark font-sans", "font-sans", inter.variable)}>
      <body>
        <div className="flex min-h-dvh flex-col">
          <TopBar />
          <main className="flex min-h-0 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
