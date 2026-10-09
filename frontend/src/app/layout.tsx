import { Inter } from "next/font/google";
import { cn } from "@/common/lib/utils";
import { TopBar } from "@/modules/top-bar";
import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/common/components/ui/tooltip";


const inter = Inter({ subsets:["latin"], variable:"--font-sans" });

export const metadata: Metadata = {
  title: "NeuroBrew",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={cn("dark font-sans", "font-sans", inter.variable)}>
      <body>
        <TooltipProvider>
          <div className="flex min-h-dvh flex-col">
            <TopBar />
            <main className="flex min-h-0 flex-1">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
