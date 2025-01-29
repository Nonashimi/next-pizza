import React from 'react'
import WhiteBlock from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details'
import { onClickCountButton } from '@/shared/hooks/use-cart'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { CheckoutItemSkeleton } from '../checkout-item-skeleton'

type Props = {
  items: CartStateItem[] ,
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>,
  DeleteItemFromCart: (id: number) => void;
  loading?: boolean
}

function InCart({items, updateCartItemQuantity, DeleteItemFromCart, loading}: Props) {
  return (
    <WhiteBlock title = "1.Корзина">
                <div className="flex flex-col gap-6">
                  {
                    loading && items.length == 0 && [...Array(3).fill(0).map((arr, index) => <CheckoutItemSkeleton key={index}/>)]
                  }
                  {
                    (!loading || items.length > 0) && items.map(item => 
                      <CheckoutItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details = {getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                        )}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type, updateCartItemQuantity)}
                        onClickRemove={() => DeleteItemFromCart(item.id)}
                      />
                    )
                  }
                  
                </div>
    </WhiteBlock>
  )
}

export default InCart