import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Originotes Marketplace",
  description: "Discover a comprehensive online marketplace connecting vendors offering a diverse array of wedding-related services with couples seeking to craft their perfect day. From intimate elopements to elaborate ceremonies, find everything you need to bring your wedding dreams to life. Explore proposal planners, date night ideas, wedding coaches, and more, all in one convenient platform. Start your journey from 'Yes' to 'I Do' today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning className="h-full" lang="en">
        <body className={`h-full ${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
