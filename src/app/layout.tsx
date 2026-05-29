import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { BottomNav } from "@/components/shared/BottomNav";
import { Toaster } from "@/components/ui/sonner";
import { FloatingChatbot } from "@/components/shared/FloatingChatbot";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "OSM Services | On-demand services made simple",
  description: "Modern marketplace for home & professional services. Book trusted experts for cleaning, maintenance, salon, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-full flex flex-col bg-background text-foreground antialiased`}>
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <Toaster />
        
        {/* Interactive Floating Chat Support & Conversational Engine */}
        <FloatingChatbot />
      </body>
    </html>
  );
}
