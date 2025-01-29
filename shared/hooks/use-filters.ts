import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";
import { PropsFilter } from "./use-query-filter";

interface PriceProps{
    priceFrom?: number,
    priceTo?: number
  }
  
  
  interface QueryFilters extends PriceProps{
    pizzaTypes: string,
    sizes: string,
    ingredients: string
  }
  
  


  export const useFIlters = () =>{
    const router = useRouter();

      const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

      const [sizes, {toggle: togleSizes}] = useSet(new Set<string>(searchParams.has("sizes")? searchParams.get("sizes")?.split(",") : []));
      const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.has("pizzaTypes")? searchParams.get("pizzaTypes")?.split(",") : []));
      const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(searchParams.has("ingredients")? searchParams.get("ingredients")?.split(",") : []));

      const [price, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
      });

    
      const updatePrice = (name: keyof PriceProps, value: number) =>{
        setPrice({
          ...price,
          [name]: value
        });
      }

        const filters: PropsFilter = {
            ...price,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients) 
        } 




      return useMemo(
        () => ({
          togleSizes, 
          togglePizzaTypes, 
          updatePrice, 
          sizes, 
          selectedIngredients, 
          pizzaTypes, 
          price, 
          filters, 
          router, 
          toggleIngredients, 
          setPrice
        }),[sizes, pizzaTypes, selectedIngredients, price]);
  }