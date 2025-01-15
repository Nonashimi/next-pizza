import { cn } from '@/shared/lib/utils'
import React, { FC } from 'react'
import ProductImage from './pizza-image'
import { Title } from './title'
import { Button } from '../ui'

interface Props  {
    imageUrl: string,
    name: string,
    className?: string,
    price: number,
    onCLickAdd?: () => void,
    loading?: boolean
}

const ChooseeProductForm = ({
    className, 
    imageUrl, 
    name, 
    onCLickAdd, 
    price,
    loading
    }: Props) => {
       
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

            <Button
                loading = {loading}
                onClick={onCLickAdd}
                className = "h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {price} P
            </Button>
        </div>
    </div>
  )
}

export default ChooseeProductForm