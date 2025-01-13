import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

type Props = {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    className?: string
}

function ProductCard({className, id, name, price, imageUrl}: Props) {
  return (
    <div className={className}>
        <Link href={`/product/${id}`}>
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                <img src={imageUrl} className='w-[215px] h-[215px]' alt={name}/>
            </div>
            <Title text={name} size = "sm" className='mb-1 mt-3 font-bold'/>
           <p className='text-sm text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nulla ut perferendis, alias recusandae fugiat odio officia eaque, nostrum, ab magni temporibus error dolores! Cum maxime delectus saepe quaerat necessitatibus!
           </p>
            <div className="flex justify-between items-center mt-4">
                <span className='text-[20px]'>
                    от <b>{price} P</b>
                </span>
                <Button variant={"outline"}>
                    <Plus size={20} className='mr-1'/>
                    Добавить
                </Button>
            </div>
        </Link>
    </div>
  )
}

export default ProductCard