import React, { useEffect, useState } from 'react'
import { Variance } from '../components/shared/group-variance';
import { PizzaSize, pizzaSizes, PizzaType } from '../constants/pizza';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib/get-available-pizza-sizes';
import { Product, ProductItem } from '@prisma/client';


interface ReturnProps{
    size: PizzaSize,
    type: PizzaType,
    setSize: (size: PizzaSize) => void,
    setType: (type: PizzaType) => void,
    selectedIngredients: Set<number>,
    addIngredient: (key: number) => void,
    availableSizes: Variance[],
    currentItemId?: number
}


export const  usePizzaOptions = (
    items: ProductItem[]
    ): ReturnProps =>{
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const availableSizes = getAvailablePizzaSizes(items, type, pizzaSizes);
    
    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

    useEffect(() => {
        const currentSize = availableSizes.find((item) => item.value === String(size) && !item.disabled);
        if(!currentSize){
            const availableSize = availableSizes?.find((item) => !item.disabled);
            if(availableSize){
                setSize(Number(availableSize.value) as PizzaSize);
            }
        }
    }, [type]);

    return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        addIngredient,
        availableSizes,
        currentItemId
    }

}
  
