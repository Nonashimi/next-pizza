import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TFormLoginValues } from './schemas';
import { Title } from '../../../title';
import FormInput from '../../../form-components/form-input';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
interface Props{
    onClose?: () => void
}


export const  LoginForm:FC<Props> = ({onClose}) => {
    const form = useForm<TFormLoginValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async(data: TFormLoginValues) => {
        try{

          const resp = await signIn('credentials', {
            ...data,
            redirect: false,
          });
          if(!resp?.ok){
            throw Error();
          }

          onClose?.();
          toast.success("Вы успешно вошли в аккаунт");

        }catch(error){
          console.log(error);
          toast.error("Не удалось войти в аккуант");
        }
    }


  return (
   <FormProvider {...form}>
    <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
    >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img src="/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>
        <FormInput name='email' label='E-Mail' required/>
        <FormInput name='password' label='Password' type='password' required/>

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
    </form>
   </FormProvider>
  )
}

export default LoginForm