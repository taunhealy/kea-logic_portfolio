"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext"; // Import the custom AuthProvider
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>{children}</AuthProvider>{" "}
        {/* Use the custom AuthProvider */}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
