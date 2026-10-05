import { TopBar } from "@/modules/top-bar";
import type { Metadata } from "next";
import "../common/styles/globals.css";


export const metadata: Metadata = {
  title: "NeuroBrew",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
