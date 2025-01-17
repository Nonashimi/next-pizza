"use client"

import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import CheckoutTotalPriceSide from '@/shared/components/shared/checkout-total-price-side'
import Container from '@/shared/components/shared/container'
import { Title } from '@/shared/components/shared/title'
import { useCart } from '@/shared/hooks/use-cart'
import InCart from "@/shared/components/shared/checkout/in-cart";
import PersonalDatas from "@/shared/components/shared/checkout/personal-datas";
import AddressForm from "@/shared/components/shared/checkout/address-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";

type Props = {}


function page({}: Props) {
  const {totalAmount,updateCartItemQuantity ,deleteItemFromCart , loading, items} = useCart();

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    }
  });


  const onSubmit: SubmitHandler<CheckoutFormValues> = (data ) => {
    console.log(data);
  }

 return (
    <Container className='mt-10'>
        <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-10">
              <div className="flex flex-col gap-10 flex-1 mb-20">
                  <InCart 
                    items={items} 
                    updateCartItemQuantity={updateCartItemQuantity}
                    DeleteItemFromCart = {deleteItemFromCart}
                  />
                  <PersonalDatas/>
                  <AddressForm/>
              </div>
              <CheckoutTotalPriceSide loading = {loading} totalAmount={totalAmount}/>
            </div>
          </form>
        </FormProvider>
    </Container>
  )
}

export default page