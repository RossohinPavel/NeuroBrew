import { Inter } from "next/font/google";
import { TopBar } from "@/components/top-bar";
import { TooltipProvider } from "@/shared/shadcn/ui/tooltip";
import { cn } from "@/shared/shadcn/utils";
import type { Metadata } from "next";
import "./globals.css";


const inter = Inter({ subsets:["latin"], variable:"--font-sans" });

export const metadata: Metadata = {
  title: "NeuroBrew",
};

export default function Layout(props: LayoutProps<"/">) {
  return (
    <html lang="ru" className={cn("dark font-sans", "font-sans", inter.variable)}>
      <body className="flex min-h-dvh flex-col">
        <TooltipProvider>
          <TopBar />
          {props.children}
        </TooltipProvider>
      </body>
    </html>
  );
}
