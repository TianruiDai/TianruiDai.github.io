import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { PageBackground } from "@/components/PageBackground";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.role,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="site-body">
        <PageBackground />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
