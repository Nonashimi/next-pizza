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

type Props = {
    product: ProductWithRelations
    className?: string
}


function ChooseProductModal({className, product}: Props) {
      const router = useRouter();
      const isPizzaForm = Boolean(product.variance[0].pizzaType)

  return (
    <Dialog open = {Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
          {isPizzaForm ?
           <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.variance}/>
            : 
           <ChooseeProductForm imageUrl={product.imageUrl} name={product.name}/>
          }
        </DialogContent>
    </Dialog>
  )
}

export default ChooseProductModal