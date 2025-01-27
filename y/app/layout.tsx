import "@/app/globals.css";
import { Providers } from "@/shared/components/shared/provider";


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
