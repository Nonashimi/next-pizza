import React, { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/DTO/cart.dto";



interface ReturnProps {
     totalAmount: number,
     updateCartItemQuantity: (id: number, quantity: number) => Promise<void>,
     items: CartStateItem[],
     deleteItemFromCart: (id: number) => void,
     loading: boolean,
     addCartItem: (values: CreateCartItemValues) => void
}
export const useCart = (): ReturnProps => {
    const [totalAmount, fetchCartItems, updateCartItemQuantity, items, deleteItemFromCart, loading, addCartItem] = useCartStore(state => 
        [ state.totalAmount, 
          state.fetchCartItems,
          state.updateCartItemQuantity,
          state.items,
          state.deleteItemFromCart,
          state.loading,
          state.addCartItem
        ]);
  
        useEffect(() => {
          fetchCartItems();
        },[]);


        return {
            totalAmount,
            updateCartItemQuantity,
            items,
            deleteItemFromCart,
            loading,
            addCartItem
        }
}

export const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus', updateCartItemQuantity: (id: number, quantity: number) => Promise<void>) => {
    const newQuantity = type == "plus" ? quantity + 1 : (quantity -1);
    updateCartItemQuantity(id, newQuantity);
}