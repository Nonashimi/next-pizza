import {Nunito} from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/shared/components/shared/provider";
const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ['400', '500', '600', '700', '800', '900'],
});

// добавить валюту
// перенести дата базу в  докер локальный постгре 
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body >
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
