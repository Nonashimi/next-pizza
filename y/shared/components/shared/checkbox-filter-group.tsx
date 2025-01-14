"use client"

import React, {  useState } from 'react'
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox'
import { Input, Skeleton } from '../ui'



type Props = {
    title: string,
    items: FilterChecboxProps[],
    defaultItems?: FilterChecboxProps[],
    limit?: number,
    SearchInputPlaceholder?: string,
    onClickCheckBox?: (id: string) => void,
    defaultValue?: string[],
    className?: string,
    loading?: boolean,
    selected?: Set<string>,
    name?: string
}

function CheckboxFilterGroup(
    {
        title,
        items,
        defaultItems,
        limit = 5,
        SearchInputPlaceholder = "Поиск...",
        className,
        onClickCheckBox,
        defaultValue,
        loading,
        selected,
        name
    }: Props) {
     const [showAll, setShowAll] = useState(false);
     const [value, setValue] = useState("");
     const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(value.toLowerCase())) : (defaultItems || items).slice(0, limit);
     

     if(loading){
        return <div className="">
                    <p className='font-bold mb-3'>{title}</p>
                    {Array(limit).fill(0).map(a =>
                        <Skeleton className='h-6 mb-4 rounded-[8px]'/>
                    )}
                    <Skeleton className='h-6 w-28 mb-4 rounded-[8px]'/>

        </div>
     }
  return (
    <div className={className}>
        <p className='font-bold mb-3'>{title}</p>
        {showAll && (
            <div className="mb-5">
                <Input placeholder={SearchInputPlaceholder} value={value} onChange={(e) => setValue(e.target.value)}  className='bg-gray-50 border-none'/>
            </div>
        )}
        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, index) =>
                <FilterCheckbox
                    key={item.name}
                    text={item.text}
                    value={item.value}
                    endAdornment = {item.endAdornment}
                    checked = {selected?.has(item.value)}
                    onCheckedChange={() => onClickCheckBox?.(item.value)}
                    name={name}
                />
            )}
        </div>
        {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ""}>
                <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                    {showAll ? 'Скрыть' : "+ Показать все"}
                </button>
            </div>
        )}
    </div>
  )
}

export default CheckboxFilterGroup