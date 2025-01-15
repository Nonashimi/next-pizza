"use client"

import { Dialog } from '@/shared/components/ui'
import { DialogContent } from '@/shared/components/ui/dialog'
import React from 'react'
import { Product } from '@prisma/client'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import ChooseeProductForm from '../choose-product-form'
import { ProductWithRelations } from '@/@types/prisma'
import PizzaImage from '../pizza-image'
import ChoosePizzaForm from '../choose-pizza-form'
import { useCartStore } from '@/shared/store/cart'
import toast from 'react-hot-toast'

type Props = {
    product: ProductWithRelations
    className?: string
}


function ChooseProductModal({className, product}: Props) {
      const router = useRouter();
      const firstItem = product.variance[0];
      const isPizzaForm = Boolean(firstItem.pizzaType)
      const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);



      const onAddItemToCart = async (productItemId: number, ingredients?: number[]) => {
        try {
          await addCartItem({
            productItemId,
            ...(ingredients && { ingredients }), 
          });
      
          toast.success(
             product.name + " добавлен в корзину"
          );
          router.back();
        } catch (e) {
          toast.error(
               `Не удалось добавить ${product.name} в корзину`
          );
        }
      };
      

  return (
    <Dialog open = {Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
          {isPizzaForm ?
           <ChoosePizzaForm 
              onCLickAdd={onAddItemToCart} 
              imageUrl={product.imageUrl} 
              name={product.name} 
              ingredients={product.ingredients} 
              items={product.variance}
              loading={loading}
              />
            : 
           <ChooseeProductForm 
              price={firstItem.price} 
              onCLickAdd={() => onAddItemToCart(firstItem.id)} 
              imageUrl={product.imageUrl} 
              name={product.name}
              loading={loading}
              />
          }
        </DialogContent>
    </Dialog>
  )
}

export default ChooseProductModal