import { cn } from '@/shared/lib/utils'
import React from 'react'
import Container from './container'
import Image from 'next/image'
import logo from "@/public/logo.png"
import { Button } from '../ui'
import { User } from 'lucide-react'
import Link from 'next/link'
import SeacrhInput from './search-input'
import CartButton from './cart-button'
type Props = {
    hasSearch?: boolean,
    className?: string,
    hasCart?: boolean,
}

function Header({className, hasSearch = true, hasCart = true}: Props) {
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
                <Button variant={"outline"} className='flex items-center gap-1'>
                    <User size={16}/>
                    Войти
                </Button>
                {hasCart && 
                     <CartButton className='group relative'/>

                }
            </div>
        </Container>
    </header>
  )
}

export default Header