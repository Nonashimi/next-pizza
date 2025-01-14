import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amout";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(req: NextRequest, {params} :{params : {id: string}})  {
    try{
        const {id} = params;
        const data = await req.json() as {quantity : number};
        const token = "123";

        if (!token) {
            return NextResponse.json({ error: "cart token not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id),
            }
        });

        if(!cartItem){
            return NextResponse.json({error: "Cart item not found"});
        }


        await prisma.cartItem.update({
            where: {
                id: Number(id),
            },
            data: {
                quantity: data.quantity
            }
        });

       
        const updatedUserCart  = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);
    }catch(error){
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'не удалось обновить корзинку' }, { status: 500 });
 }
}