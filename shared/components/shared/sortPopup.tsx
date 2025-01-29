import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

type Props = {
    className?: string
}

function SortPopup({className}: Props) {
  return (
    <div className={cn('inline-flex items-center gap-1 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
        <ArrowUpDown size={16}/>
        <b>Сортировка</b>
        <b className='text-primary'>популярная</b>
    </div>
  )
}

export default SortPopup