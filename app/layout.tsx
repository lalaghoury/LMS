import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar, SidebarNav } from "@/components/dashboard";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
axios.defaults.withCredentials = true;

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Google Classroom Clone | LMS",
  description: "A Google Classroom Clone as a LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <main className="min-h-screen w-full flex flex-col">
              <Navbar />
              <Separator className="mt-3" />
              <div className="w-full flex">
                <SidebarNav />
                <Separator orientation="vertical" className="h-screen mr-2" />
                <section className="w-full p-4">{children}</section>
              </div>
            </main>
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
