"use client"

import React, { useEffect } from 'react'
import { Title } from './title'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import CheckboxFilterGroup from './checkbox-filter-group'
import { useFIlters } from '@/shared/hooks/use-filters'
import { useIngredients } from '@/shared/hooks/use-ingredients'
import { useQueryFilters } from '@/shared/hooks/use-query-filter'

type Props = {}




function Filters({}: Props) {
  const {togglePizzaTypes, pizzaTypes, togleSizes, sizes, price, updatePrice, filters, router, selectedIngredients, toggleIngredients, setPrice} = useFIlters();
  const {ingredients, loading, defaultItem} = useIngredients();
  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  useQueryFilters(filters);
  return (
    <div className=''>
        <Title text = "Фильтрация" size = "sm" className='mb-5 font-bold'/>
        {/* checkbox */}
        <CheckboxFilterGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckBox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />
        {/* filter by sizes */}
        <CheckboxFilterGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckBox={togleSizes}
        selected={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

        {/* filter by price */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className='font-bold mb-3'>Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} value={price.priceFrom || "0"} onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}/>
                <Input type='number' placeholder='1000' min={100} max={1000} value={price.priceTo || "1000"} onChange={(e) => updatePrice("priceTo", Number(e.target.value))}/>
            </div>
            <RangeSlider min={0} max={1000} step={10} value={[price.priceFrom || 0, price.priceTo || 1000]} onValueChange={(newVal) => setPrice({priceFrom: newVal[0], priceTo: newVal[1]})}/>
        </div>
        {/* filter by ingridient */}
        <div className="">
            <CheckboxFilterGroup
              title='Ингредиенты:'
              name='ingredients'
              className='mt-5'
              limit={6}
              defaultItems={items.slice(0, 6)}
              items={items}
              loading = {loading}
              onClickCheckBox={toggleIngredients}
              selected = {selectedIngredients}
            />
        </div>
    </div>
  )
}

export default Filters