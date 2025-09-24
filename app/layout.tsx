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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KL986K9TLM"
          strategy="afterInteractive"
        />
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

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NT6VWX4K');`}
        </Script>

        {/* Binotel виджет */}
        <Script id="binotel-widget" strategy="afterInteractive">
          {`(function(d, w, s) {
            var widgetHash = '3oohp5gsdv47j5n53mm0', gcw = d.createElement(s); 
            gcw.type = 'text/javascript'; gcw.async = true;
            gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
            var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(gcw, sn);
          })(document, window, 'script');`}
        </Script>
      </head>

      <body
        className={`${comfortaaFont.className} bg-t-pale relative min-h-screen flex flex-col justify-between`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NT6VWX4K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Providers>
          {children}
          <ChatSupport />
          <FeedbackForm />
        </Providers>
      </body>
    </html>
  );
}
