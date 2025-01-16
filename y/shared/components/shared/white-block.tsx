import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from './title'

type Props = {
    className?: string,
    title?: string,
    children: React.ReactNode,
    endAdornment?: React.ReactNode,
    contentClassName?:string,
}

function WhiteBlock({
    className, 
    title,
    children,
    endAdornment,
    contentClassName
    }: Props) {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
        {title && (
            <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
            <Title text={title} size="sm" className="font-bold" />
            {endAdornment}
            </div>
        )}
        <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
  </div>
  )
}

export default WhiteBlock