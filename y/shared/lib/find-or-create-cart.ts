import { prisma } from "@/prisma/prisma-client"

export const findOrCreate = async(token: string) => {
    let userCart = await prisma.cart.findFirst({
        where: {
            token,
        }
    });

    if(!userCart){
        userCart = await prisma.cart.create({
            data: {
                token
            }
        })
    }



    return userCart;
}