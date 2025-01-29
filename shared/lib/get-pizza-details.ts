import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";


interface ReturnProps{

    textDetails: string,
    totalPrice: number
}
export const getPizzaDetails = (
    size: PizzaSize, 
    type: PizzaType,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
    ) => {

    const textDetails = `${size} см, ${mapPizzaType[type]} пицца `;
    const totalPrice = calcTotalPizzaPrice(items, ingredients, type, size, selectedIngredients);
    return {
        textDetails,
        totalPrice
    }
}