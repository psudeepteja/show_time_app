import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/lib/provider";
import HeaderComponent from "@/components/Header/Header";
import { getService } from "@/sevices/service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sudeep Show Time vercel App Nellore",
  description: "Sudeep Show Time App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const api_url = "https://apiproxy.paytm.com/v4/movies/search/cities?version=3&site_id=6&channel=HTML5&child_site_id=370&client_id=ticketnew&clientId=ticketnew"
  const getCitiesRes = await getService(api_url);
  console.log("getCitiesRes", getCitiesRes)


  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div className="container mx-auto">
            <HeaderComponent
            // getCitiesRes={getCitiesRes}
            />
            {children}
            <Footer
            // getCitiesRes={getCitiesRes} 
            />
          </div>
        </body>
      </html>
    </Providers>
  );
}
