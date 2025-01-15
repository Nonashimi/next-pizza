import { create } from 'zustand';
import { Api } from '../services/api-client';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/DTO/cart.dto';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
  deleteItemFromCart: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
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
  },
  deleteItemFromCart: async (id: number) => {
    set({ loading: true, error: false });

    try {
      const data = await Api.cart.DeleteItemFromCart(id);
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
  addCartItem: async (values: CreateCartItemValues) =>  {
    set({ loading: true, error: false });
    try {
      const data = await Api.cart.addCartItem(values);
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
