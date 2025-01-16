import { prisma } from "@/prisma/prisma-client";
import { CartItem } from "@prisma/client";
import { CreateCartItemValues } from "../services/DTO/cart.dto";

interface ReturnProps{ 
    detailsItem: {id: number, quantity: number},
    isExist: boolean
}
export const  useCheckCartIsExist = async (
    id: number, 
    data: CreateCartItemValues

    ): Promise<ReturnProps> =>  {
    const cartItems = await prisma.cartItem.findMany({
                where: {
                    cartId: id,
                    productItemId: data.productItemId,
                },
                include: {
                  ingredients: true,
                }
            });
    let isExist = false;

    const areArraysEqual = (a: number[], b: number[]): boolean => {
      if (a.length !== b.length) return false;
      return a.every((val, index) => val === b[index]);
    };
    
    const detailsItem: { id: number; quantity: number } = { id: 0, quantity: 0 };
    
    for (const cartItem of cartItems) {
      const ingredientsId = cartItem?.ingredients.map(ingredient => ingredient.id).sort((a, b) => a - b);
      const dataIngredientsId = (data.ingredients || []).slice().sort((a, b) => a - b);
    
      if (areArraysEqual(ingredientsId, dataIngredientsId)) {
        isExist = true;
        detailsItem.id = cartItem.id;
        detailsItem.quantity = cartItem.quantity;
        break; 
      }
    }

    return {
        detailsItem, 
        isExist
    };
    
};