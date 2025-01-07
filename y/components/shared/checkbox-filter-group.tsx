"use client"

import React, { useMemo, useState } from 'react'
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckbox'
import { Input } from '../ui'



type Props = {
    title: string,
    items: FilterChecboxProps[],
    defaultItems: FilterChecboxProps[],
    limit?: number,
    SearchInputPlaceholder?: string,
    onChange?: (value: string[]) => void,
    defaultValue?: string[],
    className?: string,
}

function CheckboxFilterGroup(
    {
        title,
        items,
        defaultItems,
        limit = 5,
        SearchInputPlaceholder = "Поиск...",
        className,
        onChange,
        defaultValue
    }: Props) {
     const [showAll, setShowAll] = useState(false);
     const [value, setValue] = useState("");
     const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(value.toLowerCase())) : defaultItems.slice(0, limit);
     
  return (
    <div className="">
        <p className='font-bold mb-3'>{title}</p>
        {showAll && (
            <div className="mb-5">
                <Input placeholder={SearchInputPlaceholder} value={value} onChange={(e) => setValue(e.target.value)}  className='bg-gray-50 border-none'/>
            </div>
        )}
        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, index) =>
                <FilterCheckbox
                    key={index}
                    text={item.text}
                    value={item.value}
                    endAdornment = {item.endAdornment}
                    checked = {false}
                    onCheckedChange={(ids) => console.log(ids)}
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