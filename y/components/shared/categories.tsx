"use client"
import { cn } from '@/lib/utils'
import { useCategoryState } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react'

type Props = {
    className?: string,
    items: Category[],
}


  

function Categories({className, items}: Props) {
    const activeId = useCategoryState((state) => state.activeId);
    const setActiveId = useCategoryState((state) => state.setActiveId);
    const handleButton = (id:number) =>{
        setActiveId(id);
    }
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {items.map((cat) => 
            <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
                activeId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary'
            )} 
            href={`/#${cat.name}`}
            key={cat.id}>
                <button onClick={() => handleButton(cat.id)}>
                    {cat.name}
                </button>
            </a>
        )}
    </div>
  )
}

export default Categories