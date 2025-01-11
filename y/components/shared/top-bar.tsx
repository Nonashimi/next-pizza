import React from 'react'
import Categories from './categories'
import SortPopup from './sortPopup'
import { cn } from '@/lib/utils'
import Container from './container'
import { Category } from '@prisma/client'
import { categories } from '@/prisma/constants'

type Props = {
    className?: string,
    categories: Category[],
}

function TopBar({className, categories}: Props) {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className = "flex items-center justify-between">
            <Categories items={categories}/>
            <SortPopup/>
        </Container>
    </div>
  )
}

export default TopBar