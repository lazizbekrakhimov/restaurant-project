import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restaurant | Вкусная еда ждет тебя",
  description: "Онлайн ресторан — просматривайте меню, бронируйте столики и наслаждайтесь вкусной едой.",
  keywords: ["ресторан", "меню", "бронирование", "еда"],
  icons: {
    icon: "/icons/favicon.svg"
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
