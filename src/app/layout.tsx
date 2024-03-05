import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/Providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Benimo",
  description: "A social media app using next js, mongodb, prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = "light" as string;
  return (
    <html lang="en">
      <body
        className={`${nunito.className} ${
          theme === "dark" ? "bg-[#111] text-white" : "bg-[#eee] text-black"
        }`}
      >
        <AuthProvider>
          <Header />
          <Toaster />
          <div className="pt-[60px] max-w-[1600px] mx-auto">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
