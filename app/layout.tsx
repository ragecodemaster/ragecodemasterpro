import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RageCodeMaster Pro — Learn React, JavaScript & Python",
  description:
    "Unlock your potential as a web developer. Learn React, JavaScript, Python & more. Build real-world projects with guidance from a senior engineer.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ]
  },
  openGraph: {
    title: "RageCodeMaster Pro — Learn React, JavaScript & Python",
    description:
      "Unlock your potential as a web developer. Learn React, JavaScript, Python & more. Build real-world projects with guidance from a senior engineer.",
    url: "https://www.ragecodemaster.digital",
    siteName: "RageCodeMaster Pro",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RageCodeMaster Pro"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "RageCodeMaster Pro — Learn React, JavaScript & Python",
    description:
      "Unlock your potential as a web developer. Learn React, JavaScript, Python & more. Build real-world projects with guidance from a senior engineer.",
    images: ["/og.png"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}