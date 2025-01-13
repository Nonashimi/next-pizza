import { cn } from '@/shared/lib/utils'
import React from 'react'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image'
import * as CartItem from "./cart-item-details"
import { CartItemProps } from './cart-item-details/cart-item-details.types'


interface Props extends CartItemProps{
    className?: string
}

function CartDrawerItem({className, imageUrl}: Props) {
  return (
    <div className={cn(
        className, 
        'flex bg-white p-5 gap-6'
        )}>
        <CartItem.Image src={imageUrl}/>
        <div className="flex-1">
        </div>
    </div>
  )
}

export default CartDrawerItem