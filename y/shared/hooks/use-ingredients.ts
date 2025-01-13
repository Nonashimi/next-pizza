import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

type IngredientItem = Pick<Ingredient, 'id' | 'name'>

export const useIngredients = () =>{
    const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
    const [loading, setLoading] = useState(false);
    const defaultItem = ingredients.map(item => ({value: item.id + "", text: item.name}));

        useEffect(() =>{
            async function fetchIngredients(){

        try{
            setLoading(true);
            const ingredients = await Api.ingredients.getAll();
            setIngredients(ingredients.map(ingredient => ({id: ingredient.id, name: ingredient.name})));
        }catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
        }
        
            fetchIngredients();
        }, []);


        return {
            loading, 
            defaultItem, 
            ingredients
        }
}
