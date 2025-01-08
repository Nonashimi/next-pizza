import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
className?: string,
}
const SeacrhInput = ({className}: Props) => {
  return (
    <div className={cn(``, className)}>
        <input type="text" />
    </div>
  )
}

export default SeacrhInput;