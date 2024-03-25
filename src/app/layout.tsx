import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Menu from "@/components/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Painting Company",
  description: "Dashboard App for A Paint Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="text-center mt-12 font-bold text-3xl">A Painting Company Dashboard</div>
          <br />
          <br />
          <Menu />
          <br />
          <br />
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
