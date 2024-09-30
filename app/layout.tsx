import "./globals.css";
import { Providers } from "./providers";
import { comfortaaFont } from "./components/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${comfortaaFont.className} bg-t-pale relative min-h-screen flex flex-col justify-between`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
