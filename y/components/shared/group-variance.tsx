"use client"

import { cn } from '@/lib/utils'
import React from 'react'


type Variance = {
    name: string,
    value: string,
    disabled?: boolean,
}


type Props = {
    items: readonly Variance[],
    className?: string,
    onCLick?: (value: Variance['value']) => void,
    selectedValue?: Variance['value'],
}

function GroupVariance({className, items, onCLick, selectedValue}: Props) {
  return (
    <div className={cn('flex justify-between bg-[#f3f3f7] rounded-3xl pl-1 select-none', className)}>
        {
            items.map((item) => (
                <button key={item.name} onClick={() => onCLick?.(item.value)}
                    className={cn(
                        'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                        {
                            'bg-white shadow': item.value === selectedValue,
                            'text-gray-500 opacity-50 pointer-events-none': item.disabled
                        }
                    )}
                >
                    {item.name}
                    
                </button>
            ))
        }
    </div>
  )
}

export default GroupVariance