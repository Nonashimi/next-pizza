"use client"

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store/cart';
import React from 'react'
import toast from 'react-hot-toast';
import ChoosePizzaForm from './choose-pizza-form';
import ChooseeProductForm from './choose-product-form';

type Props = {
   product: ProductWithRelations,
   _onSubmit?: VoidFunction
}

function ChooseForm({product, _onSubmit}: Props) {
    const firstItem = product.variance[0];
    const isPizzaForm = Boolean(firstItem.pizzaType)
    const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);
    
    const onAddItemToCart = async (productItemId: number, ingredients?: number[]) => {
        try {
        await addCartItem({
            productItemId,
            ...(ingredients && { ingredients }), 
        });
    
        toast.success(
            product.name + " добавлен в корзину"
        );
        _onSubmit?.();
        } catch (e) {
        toast.error(
            `Не удалось добавить ${product.name} в корзину`
        );
        }
    };
  return (
    isPizzaForm ?
        <ChoosePizzaForm
           onCLickAdd={onAddItemToCart} 
           imageUrl={product.imageUrl} 
           name={product.name} 
           ingredients={product.ingredients} 
           items={product.variance}
           loading={loading}
           />
         : 
        <ChooseeProductForm
           price={firstItem.price} 
           onCLickAdd={() => onAddItemToCart(firstItem.id)} 
           imageUrl={product.imageUrl} 
           name={product.name}
           loading={loading}
           />
  )
}

export default ChooseForm;