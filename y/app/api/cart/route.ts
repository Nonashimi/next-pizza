import { prisma } from '@/prisma/prisma-client';
import Cookies from 'js-cookie';
import { NextRequest, NextResponse } from 'next/server';
import crypto from "crypto";
import { findOrCreate } from '@/shared/lib/find-or-create-cart';
import { CartDTO, CreateCartItemValues } from '@/shared/services/DTO/cart.dto';
import IngredientCard from '@/shared/components/shared/ingredient-card';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amout';
import { useCheckCartIsExist } from '@/shared/hooks/use-check-cart-exist';
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
    try{
        let token = req.cookies.get("token")?.value;
        
        if(!token){
          token = crypto.randomUUID();
        }

        const userCart = await findOrCreate(token);

        const data = (await req.json()) as CreateCartItemValues;
        const {isExist, detailsItem} = await useCheckCartIsExist(userCart.id, data).then(r => r);

        if(isExist){
            await prisma.cartItem.update({
                where: {
                    id: detailsItem.id
                },
                data: {
                    quantity: detailsItem.quantity + 1,
                }
            })
        }else{
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: {connect: data.ingredients?.map((id) => ({id}))},
                }
            })
        }

        const updatedUserCart = await updateCartTotalAmount(token);
        const response =  NextResponse.json(updatedUserCart);

        response.cookies.set('token', token);

        return response;


    }catch(error){
        console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
    }
}  