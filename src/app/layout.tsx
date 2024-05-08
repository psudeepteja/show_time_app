import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/lib/provider";
import HeaderComponent from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sudeep Show Time vercel App Nellore",
  description: "Sudeep Show Time App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto">
          <HeaderComponent />
          {children}
          <Footer />
        </div>
      </body>
    </html>
    </Providers>
  );
}
