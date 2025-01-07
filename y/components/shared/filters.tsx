import React from 'react'
import { Title } from './title'
import { FilterCheckbox } from './FilterCheckbox'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import CheckboxFilterGroup from './checkbox-filter-group'

type Props = {}

function Filters({}: Props) {
  return (
    <div>
        <Title text = "Фильтрация" size = "sm" className='mb-5 font-bold'/>
        {/* checkbox */}
        <div className="flex flex-col gap-4">
            <FilterCheckbox text = "Можно собирать" value = "1"/>
            <FilterCheckbox text = "Новинки" value = "2"/>
        </div>
        {/* filter by price */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className='font-bold mb-3'>Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0}/>
                <Input type='number' placeholder='1000' min={100} max={1000}/>
            </div>
            <RangeSlider min={0} max={1000} step={10} value={[0, 1000]}/>
        </div>
        {/* filter by ingridient */}
        <div className="">
            <CheckboxFilterGroup
              title='Ингредиенты:'
              className='mt-5'
              limit={6}
              defaultItems={[
                {
                  text: 'Cырный соус',
                  value: "1",
                },
                {
                  text: 'Моцарелла',
                  value: "2",
                },
                {
                  text: 'Чеснок',
                  value: "3",
                },
                {
                  text: 'Соленые огурчики',
                  value: "4",
                },
                {
                  text: 'Cырный соус',
                  value: "1",
                },
                {
                  text: 'Моцарелла',
                  value: "2",
                },
                {
                  text: 'Чеснок',
                  value: "3",
                },
                {
                  text: 'Соленые огурчики',
                  value: "4",
                },
                {
                  text: 'Cырный соус',
                  value: "1",
                },
                {
                  text: 'Моцарелла',
                  value: "2",
                },
                {
                  text: 'Чеснок',
                  value: "3",
                },
                {
                  text: 'Соленые огурчики',
                  value: "4",
                },
              ]}
              items={[
                {
                  text: 'Cырный соус',
                  value: "1",
                },
                {
                  text: 'Моцарелла',
                  value: "2",
                },
                {
                  text: 'Чеснок',
                  value: "3",
                },
                {
                  text: 'Соленые огурчики',
                  value: "4",
                },
                {
                  text: 'Cырный соус',
                  value: "1",
                },
                {
                  text: 'Моцарелла',
                  value: "2",
                },
                {
                  text: 'Чеснок',
                  value: "3",
                },
                {
                  text: 'Соленые огурчики',
                  value: "4",
                },
                {
                  text: 'Cырный соус',
                  value: "1",
                },
                {
                  text: 'Моцарелла',
                  value: "2",
                },
                {
                  text: 'Чеснок',
                  value: "3",
                },
                {
                  text: 'Соленые огурчики',
                  value: "4",
                },
              ]}
            />
        </div>
    </div>
  )
}

export default Filters