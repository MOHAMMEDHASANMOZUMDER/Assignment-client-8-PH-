import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Toaster } from "react-hot-toast";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = { title: "StudioSpace — Creative spaces, made simple", description: "Book your next creative studio." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><AuthProvider><Header /><Toaster position="top-right" toastOptions={{ duration: 3500 }} />{children}<SiteFooter /></AuthProvider></body></html>;
}
