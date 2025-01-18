import {Nunito} from "next/font/google";
import "@/app/globals.css";
import {Toaster} from "react-hot-toast";
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
            {children}
            <Toaster/>
        </body>
    </html>
  );
}
