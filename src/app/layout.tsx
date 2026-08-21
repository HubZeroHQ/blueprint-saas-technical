import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { Footer } from "@/components/navigation/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { JsonLd } from "@/components/shared/JsonLd";
import { metadata } from "@/config/metadata";
import { site } from "@/config/site";
import { AppProvider } from "@/providers/AppProvider";
import { themeInitScript } from "@/providers/ThemeProvider";
import { organizationSchema } from "@/seo/structuredData";
import { EASE_FAST } from "@/utils/motion";

export { metadata };

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={site.locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <JsonLd data={organizationSchema()} />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a
          href="#main-content"
          className={`fixed left-4 top-4 z-50 -translate-y-20 rounded-technical bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform ${EASE_FAST} focus:translate-y-0`}
        >
          Skip to content
        </a>
        <AppProvider>
          <Navbar />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
