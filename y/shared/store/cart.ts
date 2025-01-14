import { create } from 'zustand';
import { Api } from '../services/api-client';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    set({ loading: true, error: false });

    try {
      const data = await Api.cart.getCart();
      const cartDetails = getCartDetails(data); 

      set({
        items: cartDetails.items,
        totalAmount: cartDetails.totalAmount,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateCartItemQuantity: async (id: number, quantity: number) => {
    set({ loading: true, error: false });

    try {
      const data = await Api.cart.updateItemQuantity(id, quantity);
      const cartDetails = getCartDetails(data);  
      set({
        items: cartDetails.items,
        totalAmount: cartDetails.totalAmount,
      });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  }
}));
