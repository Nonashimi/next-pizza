import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children : React.ReactNode,
    className?: string
}

function Container({children, className}: Props) {
  return (
    <div className={cn('mx-auto w-[1280px] mx-w-[1280px]', className)}>
        {children}
    </div>
  )
}

export default Container