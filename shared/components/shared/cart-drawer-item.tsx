import { cn } from '@/shared/lib/utils'
import React from 'react'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image'
import * as CartItem from "./cart-item-details"
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'
import { useCartStore } from '@/shared/store/cart'


interface Props extends CartItemProps{
    onCLickUpdateQuantity?: (type: "plus" | 'minus') => void;
    onCLickDeleteButton?: () => void
    className?: string
}

function CartDrawerItem({
  className, 
  imageUrl,
  name,
  details,
  quantity,
  price,
  disabled,
  id,
  onCLickUpdateQuantity,
  onCLickDeleteButton

}: Props) {

  return (
    <div className={cn(
        className, 
        'flex bg-white p-5 gap-6',
        {'opacity-50 pointer-events-none': disabled}
        )}>
        <CartItem.Image src={imageUrl}/>
        <div className="flex-1">
          <CartItem.Info details={details} name={name}/>
          <hr className='my-3'/>
          <div className="flex items-center justify-between">
              <CountButton onClick={onCLickUpdateQuantity} value={quantity}/>
                <div className="flex items-center gap-3">
                    <CartItem.Price value={price}/>
                    <Trash2Icon onClick={onCLickDeleteButton}  className='text-gray-400 cursor-pointer hover:text-gray-600' size = {16}/>
                </div>
          </div>
        </div>
    </div>
  )
}

export default CartDrawerItem