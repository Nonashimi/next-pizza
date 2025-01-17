"use client"

import { CheckoutItem } from '@/shared/components/shared/checkout-item'
import { CheckoutItemDetails } from '@/shared/components/shared/checkout-item-details'
import CheckoutTotalPriceSide from '@/shared/components/shared/checkout-total-price-side'
import Container from '@/shared/components/shared/container'
import { Title } from '@/shared/components/shared/title'
import WhiteBlock from '@/shared/components/shared/white-block'
import { Button, Input, Skeleton } from '@/shared/components/ui'
import { Textarea } from '@/shared/components/ui/textarea'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { onClickCountButton, useCart } from '@/shared/hooks/use-cart'
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import React from 'react'

type Props = {}


function page({}: Props) {
  const {totalAmount,updateCartItemQuantity ,deleteItemFromCart , loading, items} = useCart();
 return (
    <Container className='mt-10'>
        <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
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
                      onClickRemove={() => deleteItemFromCart(item.id)}
                    />
                  )}
                </div>
              </WhiteBlock>
              <WhiteBlock title = "2. Персональные данные">
                  <div className="grid grid-cols-2 gap-5">
                      <Input name="firstName" className="text-base" placeholder="Имя" />
                      <Input name="lastName" className="text-base" placeholder="Фамилия" />
                      <Input name="email" className="text-base" placeholder="E-Mail" />
                      <Input name="phone" className="text-base" placeholder="Телефон" />
                  </div>
              </WhiteBlock>
              <WhiteBlock title='3. Адрес доставки'>
                <div className="flex flex-col gap-5">
                  <Input name="firstName" className="text-base" placeholder="adress" />
                  <Textarea
                    rows={5}
                    className='text-base'
                    placeholder='коментарий к заказу'
                  />
                </div>
              </WhiteBlock>
          </div>
          <CheckoutTotalPriceSide loading = {loading} totalAmount={totalAmount}/>
        </div>

    </Container>
  )
}

export default page