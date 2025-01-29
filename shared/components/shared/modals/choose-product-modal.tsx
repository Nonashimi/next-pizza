"use client"

import { Dialog } from '@/shared/components/ui'
import { DialogContent } from '@/shared/components/ui/dialog'
import React from 'react'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/@types/prisma'

import ChooseForm from '../choose-form'

type Props = {
    product: ProductWithRelations
    className?: string
}


function ChooseProductModal({className, product}: Props) {
    const router = useRouter();
  return (
    <Dialog open = {Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
         <ChooseForm product={product} _onSubmit={() => router.back()}/>
        </DialogContent>
    </Dialog>
  )
}

export default ChooseProductModal