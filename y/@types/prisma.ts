import { Ingredient, Product, ProductItem } from "@prisma/client";


export type ProductWithRelations = Product & { variance: ProductItem[]; ingredients: Ingredient[] };
