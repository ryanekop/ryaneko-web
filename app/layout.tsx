import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryan Eko Apps",
  description: "Suite of tools for professional photographers and videographers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
        {umamiWebsiteId ? (
          <>
            <Script
              defer
              src="https://umami.ryanekoapp.web.id/script.js"
              data-website-id={umamiWebsiteId}
              strategy="afterInteractive"
            />
            <Script
              defer
              src="https://umami.ryanekoapp.web.id/recorder.js"
              data-website-id={umamiWebsiteId}
              data-sample-rate="0.15"
              data-mask-level="moderate"
              data-max-duration="300000"
              strategy="afterInteractive"
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
