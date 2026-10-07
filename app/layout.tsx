import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
    <html
      lang="en"
      className={`${geistSans.variable} antialiased`}
      data-theme="night"
      suppressHydrationWarning
    >
      <body className="site-body">
        <Script id="theme" strategy="beforeInteractive">
          {`document.documentElement.dataset.theme=localStorage.getItem("theme")||"night"`}
        </Script>
        <div className="site-content">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
