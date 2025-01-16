import Header from '@/shared/components/shared/header';
import { Metadata } from 'next';
import React from 'react'

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
        <Header hasCart = {false} hasSearch = {false} className="border-gray-200"/>
            {children}
    </div>
  )
}

export default CheckoutLayout