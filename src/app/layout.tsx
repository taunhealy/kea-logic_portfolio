import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/auth/AuthProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { getAuth } from "@/features/auth/queries/get-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout user={user}>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

function ClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar user={user} />
      <hr />
      <main className="p-4">{children}</main>
      <Footer />
    </QueryClientProvider>
  );
}
