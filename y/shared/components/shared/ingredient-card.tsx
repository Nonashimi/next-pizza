import { cn } from '@/shared/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

type Props = {
    imageUrl : string,
    name: string,
    price: number,
    active?: boolean,
    onClick?: () => void,
    className?: string
    
}

function IngredientCard({imageUrl, name, price, active, onClick, className}: Props) {
  return (
    <div className={cn(
        'flex items-center flex-col p-1 m-[1px] rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        {'border border-primary m-0': active},
        className
    )} 
    onClick={onClick}>
        {active && <CircleCheck className='absolute top-1 right-1 text-primary'/>}
        <img src={imageUrl} alt={name} className='w-[110px] h-[110px]' />
        <span className='text-xs mb-1'>{name}</span>
        <span className='font-bold'>{price} P</span>
    </div>
  )
}

export default IngredientCard