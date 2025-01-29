import { Ingredient, ProductItem } from "@prisma/client";



/**
* Функция для подсчета общей стоимости
*/
export const calcTotalPizzaPrice = (
    items: ProductItem[], 
    ingredients: Ingredient[], 
    type: number, 
    size: number, 
    selectedIngredients: Set<number>
) =>{
    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)!.price;
    
    const ingredientsTotalPrice = ingredients.filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
    const totalPrice = pizzaPrice + ingredientsTotalPrice;
    
    return totalPrice;
}