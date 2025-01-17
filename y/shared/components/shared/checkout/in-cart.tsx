import React from 'react'
import WhiteBlock from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details'
import { onClickCountButton } from '@/shared/hooks/use-cart'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/get-cart-details'

type Props = {
  items: CartStateItem[] ,
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>,
  DeleteItemFromCart: (id: number) => void;
}

function InCart({items, updateCartItemQuantity, DeleteItemFromCart}: Props) {
  return (
    <WhiteBlock title = "1.Корзина">
                <div className="flex flex-col gap-6">

                  {items.map(item => 
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
                  )}
                </div>
    </WhiteBlock>
  )
}

export default InCart