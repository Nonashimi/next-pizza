"use client"
import { cn } from '@/lib/utils'
import { useCategoryState } from '@/store/category';
import React from 'react'

type Props = {
    className?: string
}


const cats = [
    { "id": 1, "name": "Пиццы" },
    { "id": 2, "name": "Комбо" },
    { "id": 3, "name": "Закуски" },
    { "id": 4, "name": "Кофе" },
    { "id": 5, "name": "Коктейли" },
    { "id": 6, "name": "Десерты" },
    { "id": 7, "name": "Напитки" }
  ];
  

function Categories({className}: Props) {
    const activeId = useCategoryState((state) => state.activeId);
    const setActiveId = useCategoryState((state) => state.setActiveId);
    const handleButton = (id:number) =>{
        setActiveId(id);
    }
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {cats.map((cat) => 
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