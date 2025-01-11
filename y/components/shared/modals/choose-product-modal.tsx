"use client"

import { Dialog } from '@/components/ui'
import { DialogContent } from '@/components/ui/dialog'
import React from 'react'
import { Title } from '../title'
import { Product } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type Props = {
    product: Product
    className?: string
}


function ChooseProductModal({className, product}: Props) {
    const router = useRouter();
    
    if (performance.navigation.type === 1) {
        console.log('Страница перезагружена');
      } else {
        console.log('Это не перезагрузка, а первая загрузка страницы');
      }
      
  return (
    <Dialog open = {Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
            <Title text={product.name}/>
        </DialogContent>
    </Dialog>
  )
}

export default ChooseProductModal