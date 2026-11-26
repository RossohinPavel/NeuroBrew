import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { TopBar } from "@/components/top-bar";
import { getPayload } from "@/entities/session";
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

export default async function Layout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const payload = getPayload(cookieStore);

  return (
    <html
      lang="ru"
      className={cn("dark font-sans", "font-sans", inter.variable)}
    >
      <body className="flex min-h-dvh flex-col">
        <TopBar username={payload?.username} />
        {children}
      </body>
    </html>
  );
}
