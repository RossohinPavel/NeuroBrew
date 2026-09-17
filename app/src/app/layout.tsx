import type { Metadata } from "next";
import "../common/styles/globals.css";


export const metadata: Metadata = {
  title: "NeuroBrew",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
