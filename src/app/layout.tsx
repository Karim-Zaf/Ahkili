import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahkili",
  description: "Your personal assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-slate-100'}>
        {children}
        <h1 className='fixed bottom-5 right-5 text-gray-300'>&copy; Made by Karim Zaafrani</h1>
      </body>
    </html>
  );
}
