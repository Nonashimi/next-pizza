"use client"

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CartDrawerItem from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import Image from "next/image";
import EmptyCart from "@/public/images/empty-box.png";
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { onClickCountButton, useCart } from '@/shared/hooks/use-cart';
type Props = {
    className?: string,
    children: React.ReactNode
}

export const  CartDrawer:FC<PropsWithChildren<Props>> = 
    ({children, className}: Props) => {
      const {totalAmount, updateCartItemQuantity, deleteItemFromCart, loading, items} = useCart();
     const [redirectind, setRedirecting] = useState(false);

      const onCLickTrashButton = (id: number) => {
        deleteItemFromCart(id);
      }
  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
          <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
           {totalAmount > 0 && 
           <>
            <SheetHeader>
            <SheetTitle>
                В корзине <span className='font-bold'>{items.length} товара</span>
            </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto  flex-1">
            {
              items.map((item) => 
              <CartDrawerItem
                className='mb-2'
                name = {item.name}
                quantity={item.quantity}
                price = {item.price}
                id = {item.id}
                details={getCartItemDetails( item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize,)}
                imageUrl={item.imageUrl}
                disabled = {item.disabled}
                onCLickUpdateQuantity={(type) => onClickCountButton(item.id, item.quantity, type, updateCartItemQuantity)}
                onCLickDeleteButton = {() => onCLickTrashButton(item.id)}
             />

              )
            }
            </div>
           </>
           

           }
            {totalAmount == 0 && 
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src={EmptyCart} alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>
              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
              </div>
            }

            {totalAmount > 0 && 
               <SheetFooter className="-mx-6 bg-white p-8">
               <div className="w-full">
                 <div className="flex mb-4">
                   <span className="flex flex-1 text-lg text-neutral-500">
                     Итого
                     <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                   </span>

                   <span className="font-bold text-lg">{totalAmount} ₽</span>
                 </div>

                 <Link href="/checkout">
                   <Button
                     loading={loading}
                     type="submit"
                     className="w-full h-12 text-base">
                     Оформить заказ
                     <ArrowRight className="w-5 ml-2" />
                   </Button>
                 </Link>
               </div>
             </SheetFooter>
            }

          </div>
        </SheetContent>
    </Sheet>
  )
}
