import { ProductItem } from "@prisma/client";
import { Variance } from "../components/shared/group-variance";

export const getAvailablePizzaSizes = (items: ProductItem[], type: number, pizzaSizes:Variance[]): Variance[] =>{
      const FilteredPizzasByType = items.filter(item => {
                return item.pizzaType === type
            });
            const availablePizzaSizes = pizzaSizes.map(item => {
                return {
                    ...item,
                    disabled: !FilteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
                }
            });


            return availablePizzaSizes;
    
}