import type { Metadata } from "next";
import Header from "@/components/shared/header";


export const metadata: Metadata = {
  title: "Next Pizza | Main",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
         <Header/>
         <main className="min-h-screen">
          {children}
         </main>

    </div>
  );
}
