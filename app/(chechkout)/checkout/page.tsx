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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";



function Page() {
  const {totalAmount,updateCartItemQuantity ,deleteItemFromCart , loading, items} = useCart();
  const [submitting, setSubmitting] = useState(false);
  const {data: session} = useSession();
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


  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.me.getMe();
      const [firstName, lastName] = data.fullName.split(" ");
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }


    if(session){
      fetchUserInfo();
    }
  }, [session]);


  const onSubmit: SubmitHandler<CheckoutFormValues> = async(data: CheckoutFormValues ) => {
      try{
        setSubmitting(true);
        const url = await createOrder(data);
        toast.success("Заказ успешно оформлен Переход на оплату ...");

        if(url){
          location.href = url;
        }

      }catch(error){
        console.error(error);
        toast.error("не удалось создать заказ", {
          icon: ""
        })
      }finally{
        setSubmitting(false);
      }
  }

 return (

    <Container className='mt-10'>
        <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* {"left side"} */}
            <div className="flex gap-10">
              <div className="flex flex-col gap-10 flex-1 mb-20">
                  <InCart 
                    items={items} 
                    updateCartItemQuantity={updateCartItemQuantity}
                    DeleteItemFromCart = {deleteItemFromCart}
                    loading = {loading}
                  />
                  <PersonalDatas className = {loading ? "pointer-events-none opacity-40" : ""}/>
                  <AddressForm className = {loading ? "pointer-events-none opacity-40" : ""}/>
              </div>
              {/* {"right side"} */}
              <CheckoutTotalPriceSide loading = {loading || submitting} totalAmount={totalAmount}/>
            </div>
          </form>
        </FormProvider>
    </Container>
  )
}

export default Page