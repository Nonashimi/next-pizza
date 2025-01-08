import { cn } from '@/lib/utils'
import React from 'react'
import Container from './container'
import Image from 'next/image'
import logo from "@/public/logo.png"
import { Button } from '../ui'
import { ArrowRight, ShoppingBag, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import SeacrhInput from './search-input'
type Props = {}

function Header({}: Props) {
  return (
    <header className={cn('border border-b')}>
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
            <div className="mx-10 flex-1">
                <SeacrhInput/>
            </div>
            <div className="flex  gap-4">
                <Button variant={"outline"} className='flex items-center gap-1'>
                    <User size={16}/>
                    Войти
                </Button>
                <Button className='group relative'>
                    <b>520 P</b>
                    <span className='w-[1px] h-full bg-white/30 mx-3'/>
                    <div className="flex gap-1 transition duration-300 group-hover:opacity-0">
                        <ShoppingCart className='h-4 w-4 relative' strokeWidth={2}/>
                        <b>3</b>
                    </div>
                    <ArrowRight className='w-5 opacity-0 absolute right-5 transition duration-300 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'/>
                </Button>
            </div>
        </Container>
    </header>
  )
}

export default Header