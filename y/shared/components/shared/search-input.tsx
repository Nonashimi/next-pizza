"use client"

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use';

type Props = {
className?: string,
}
const SeacrhInput = ({className}: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [prodcuts, setProducts] = useState<Product[]>([]);
    const ref = useRef(null)


    useClickAway(ref, () => {
        setFocused(false);
    });


    useDebounce(() =>{
     Api.products.search(searchQuery).then(data => {
        setProducts(data);
     })
    },
    250,
    [searchQuery]
);

const onCLickItem = () =>{
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
}
  return (
   <>
   {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>}
    
    <div ref={ref} className={cn(`flex rounded-2xl flex-1 justify-between relative h-11 z-30`, className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus = {() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {prodcuts.length > 0 &&  <div className={
            cn(`absolute w-full rounded-xl py-2 top-14 shadow-md transition-all bg-white duration-200 invisible opacity-0 z-30`,
                focused && 'visible opacity-100 top-12'
            )}>
                {prodcuts.map(product =>
                    <Link 
                        onClick={onCLickItem}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer" 
                        href={`/product/${product.id}`}
                        key = {product.id}
                        >
                        <img 
                            className='w-8 h-8 rounded-sm' 
                            src={product.imageUrl} 
                            alt={product.name} />
                        <div>
                            {product.name}
                        </div>
                    </Link>
                )}
        </div>}
    </div>
   
   </>
  )
}

export default SeacrhInput;