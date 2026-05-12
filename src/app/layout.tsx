import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Alvi Girls Degree College", template: "%s | Alvi GDC" },
  description: "Premier degree college offering quality education in arts, science, and commerce.",
  keywords: ["college", "education", "degree", "Alvi Girls Degree College", "Alvi GDC", "Uttar Pradesh", "India", "NAAC A+", "undergraduate", "postgraduate", "courses", "faculty", "events"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
