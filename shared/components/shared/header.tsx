"use client"

import { cn } from '@/shared/lib/utils'
import React, { useEffect, useState } from 'react'
import Container from './container'
import Image from 'next/image'
import logo from "@/public/logo.png"
import Link from 'next/link'
import SeacrhInput from './search-input'
import CartButton from './cart-button'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import ProfileButton from './profile-button'
import { AuthModal } from './modals/auth-modals'
type Props = {
    hasSearch?: boolean,
    className?: string,
    hasCart?: boolean,
}

function Header({className, hasSearch = true, hasCart = true}: Props) {
    const searchParams = useSearchParams();
    const [isModelOpen, setIsModelOpen] = useState(false);
    
    const router = useRouter();
    useEffect(() => {
        let toastmessage = '';
        if(searchParams.has('paid')){
            toastmessage = "Платеж успешно прошел!";
        }
        if(searchParams.has('verified')){
            toastmessage = "Пользователь успешно верифицирован!";
        }

        if(toastmessage){
            router.replace('/');
            setTimeout(() => {
                toast.success("Заказ успешно оплачен");
            }, 500);
        }
    }, []);

  return (
    <header className={cn('border border-b', className)}>
        <Container className='flex items-center justify-between py-8 '>
            <Link href={"/"}>
                <div className="flex items-center gap-4">
                    <Image src={logo} alt='logo' width={35} height={35}/>
                    <div className="">
                        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </div>
            </Link>
            {
                hasSearch && 
                <div className="mx-10 flex-1">
                    <SeacrhInput/>
                </div>
            }
            <div className="flex  gap-4">
                <AuthModal open = {isModelOpen} onCLose={() => setIsModelOpen(false)}/>
               <ProfileButton onClickSignIn={() => setIsModelOpen(true)}/>
                {hasCart && 
                     <CartButton className='group relative'/>

                }
            </div>
        </Container>
    </header>
  )
}

export default Header