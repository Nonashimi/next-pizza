import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TFormLoginValues } from './schemas';
import { Title } from '../../../title';
import FormInput from '../../../form-components/form-input';
import { Button } from '@/shared/components/ui';

interface Props{
    onClose?: VoidFunction
}

export const  LoginForm:FC = ({}: Props) => {
    const form = useForm<TFormLoginValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = () => {
        
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
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
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