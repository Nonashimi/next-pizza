import Header from '@/shared/components/shared/header';
import { Metadata } from 'next';
import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode

}

export const metadata: Metadata = {
    title: "Next Pizza | Cart",
  };
  

function CheckoutLayout({
    children
}: Props) {
  return (
    <div className="min-h-screen bg-[#f4f1ee]">
      <Suspense>
       <Header hasCart = {false} hasSearch = {false} className="border-gray-200"/>
      </Suspense>
            {children}
    </div>
  )
}

export default CheckoutLayout