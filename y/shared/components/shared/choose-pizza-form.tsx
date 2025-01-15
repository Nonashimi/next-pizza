import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import PizzaImage from './pizza-image'
import { Ingredient, ProductItem } from '@prisma/client'
import GroupVariance from './group-variance'
import {PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import IngredientCard from './ingredient-card'
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options'
import { getPizzaDetails } from '@/shared/lib/get-pizza-details'

interface Props  {
    imageUrl: string,
    name: string,
    className?: string,
    onCLickAdd: (itemId:number, ingredients: number[]) => void,
    ingredients: Ingredient[],
    items: ProductItem[],
    loading?: boolean
}

const ChoosePizzaForm = ({
    className, 
    imageUrl, 
    name, 
    onCLickAdd, 
    ingredients,
    loading ,
    items
    }: Props) => {


        const {size, type, setSize, setType, selectedIngredients, addIngredient, availableSizes: availablePizzaSizes, currentItemId} = usePizzaOptions(items);
        const {textDetails, totalPrice} = getPizzaDetails(size, type, items, ingredients, selectedIngredients);
        const handleCLickAdd = () => {
            if(currentItemId)
            onCLickAdd(currentItemId, Array.from(selectedIngredients));
        }
  return (
    <div className={cn(className, 'flex flex-1')}>
        <PizzaImage size={size} src={imageUrl}/>
        <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size='md' className={'font-extrabold mb-1'}/>

            <p className='text-gray-400'>{textDetails}</p>
            <div className="flex flex-col gap-4 mt-5">
            <GroupVariance
                items={availablePizzaSizes}
                value={String(size)}
                onCLick={value => setSize(Number(value) as PizzaSize)}
            />
            <GroupVariance
                items={pizzaTypes}
                value={String(type)}
                onCLick={value => setType(Number(value) as PizzaType)}
                
            />
            </div>
            <div className="bg-gray-50 p-5 rounded-md h-[435px] overflow-auto scrollbar mt-5">
                <div className="grid grid-cols-3 gap-3 mt-5 ">
                    {ingredients?.map(ingredient => 
                        <IngredientCard 
                            imageUrl = {ingredient.imageUrl} 
                            name = {ingredient.name}
                            price = {ingredient.price}
                            key={ingredient.id}
                            active = {selectedIngredients.has(ingredient.id)}
                            onClick={() => addIngredient(ingredient.id)}
                        />
                    )}
                </div>
            </div>
           
            <Button
                loading = {loading}
                onClick={handleCLickAdd}
                className = "h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} P
            </Button>
        </div>
    </div>
  )
}

export default ChoosePizzaForm;