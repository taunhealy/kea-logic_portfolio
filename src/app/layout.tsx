import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/context/Providers";
import NavBar from "@/components/NavBar";
import Toaster from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth(); // Use the useAuth hook to get the user

  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen pt-16 antialiased")}>
        <Providers>
          <NavBar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
