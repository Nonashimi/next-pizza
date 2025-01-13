import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Button } from '../ui'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { CartDrawer } from './cart-drawer'

type Props = {
    className?: string
}

function CartButton({className}: Props) {
  return (
    <CartDrawer>
        <Button className={cn(className, '')}>
            <b>520 P</b>
            <span className='w-[1px] h-full bg-white/30 mx-3'/>
            <div className="flex gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className='h-4 w-4 relative' strokeWidth={2}/>
                <b>3</b>
            </div>
            <ArrowRight className='w-5 opacity-0 absolute right-5 transition duration-300 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'/>
        </Button>
    </CartDrawer>
  )
}

export default CartButton