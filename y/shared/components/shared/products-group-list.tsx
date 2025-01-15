"use client"

import React, { useEffect, useRef } from 'react'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import {useIntersection} from "react-use"
import ProductCard from './product-card'
import { useCategoryState } from '@/shared/store/category'
import { products } from '@/prisma/constants'
import { Product } from '@prisma/client'
import { ProductWithRelations } from '@/@types/prisma'

type Props = {
    title: string,
    items: ProductWithRelations[],
    className?: string,
    listClassName?: string,
    categoryId: number
}

function ProductsGroupList(
    {
        title,
        items, 
        className,
        listClassName,
        categoryId
    }: Props) {   
        
        const setActiveCategoryId = useCategoryState((state) => state.setActiveId);
        const intersectionRef = useRef(null);
        const intersection = useIntersection(intersectionRef, {
            threshold: .4,
        });

        useEffect(() =>{
            if(intersection?.isIntersecting){
                setActiveCategoryId(categoryId);
            }
        },[intersection?.isIntersecting, title, categoryId]);


  return (
    <div className={className} id = {title} ref={intersectionRef}>
        <Title text = {title} size='lg' className='font-extrabold mb-5'/>
        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
            {items.map((item, i) =>
                <ProductCard
                key={item.id}
                id = {item.id}
                name = {item.name}
                imageUrl={item.imageUrl}
                price = {item.variance[0].price}
                ingredients = {item.ingredients}
                />
            )}
        </div>
    </div>
  )
}

export default ProductsGroupList