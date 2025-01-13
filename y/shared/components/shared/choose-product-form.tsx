import { cn } from '@/shared/lib/utils'
import React, { FC } from 'react'
import ProductImage from './pizza-image'
import { Title } from './title'
import { Button } from '../ui'

interface Props  {
    imageUrl: string,
    name: string,
    className?: string,
    onCLickAdd?: VoidFunction,
}

const ChooseeProductForm = ({
    className, 
    imageUrl, 
    name, 
    onCLickAdd, 
    }: Props) => {
        const textDetails = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?';
        const totalPrice = 350;
  return (
    <div className={cn(className, 'flex flex-1')}>
        <div className="flex items-center justify-center flex-1 relative w-full">
            <img 
                src={imageUrl} 
                alt={name} 
                className='relative left-2 top-2 transition-all duration-300 w-[350px] h-[350px]'
            />
        </div>
        <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size='md' className={'font-extrabold mb-1'}/>

            <p className='text-gray-400'>{textDetails}</p>
            <Button
                className = "h-[55px] px-10 text-base rounded-[18px] w-full mt-10">

                Добавить в корзину за {totalPrice} P
            </Button>
        </div>
    </div>
  )
}

export default ChooseeProductForm