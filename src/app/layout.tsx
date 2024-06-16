import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CoreProvider } from "../components/CoreProvider";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel",
  description: "Hotel",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </CoreProvider>
  );
}
