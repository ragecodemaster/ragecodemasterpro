
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "RageCodeMaster",
  description: "Created with RageCodeMaster Pro",
  generator: "v0.dev",
  icons: {
    icon: "/ChatGPT.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17276899773"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17276899773');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
