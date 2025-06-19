import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { comfortaaFont } from "./components/ui/fonts";
import FeedbackForm from "./components/ui/feedback/FeedbackForm";
import ChatSupport from "./components/ui/ChatSupport";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KL986K9TLM" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KL986K9TLM');
            `,
          }}
        />
      </head>

      <body className={`${comfortaaFont.className} bg-t-pale relative min-h-screen flex flex-col justify-between`}>
        <Providers>
          {children}
          <ChatSupport />
          <FeedbackForm />
        </Providers>
      </body>
    </html>
  );
}
