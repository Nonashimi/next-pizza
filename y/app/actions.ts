"use server";
import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { createPayment } from "@/shared/lib/create-payment";
import { sendEmail } from "@/shared/lib/send-email";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";


export async function createOrder(data: CheckoutFormValues) {
    try{
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if(!token){
            throw new Error("Cart token not found");
        }


        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token : token
            }
        });



        if(!userCart){
            throw new Error("Cart not found");
        }

        if(userCart?.totalAmount === 0){
            throw new Error("Cart is empty");
        }


        
        const order = await prisma.order.create({
            data: {
                token,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                Status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        });


        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        });


    


        const paymentData = await createPayment(
                {
                    amount: order.totalAmount,
                    orderId: order.id,
                    description: "Оплата заказа #" + order.id
                }
        );

        if(!paymentData){
            throw new Error('Payment data not found');
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id 
            }

        })
        

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(data.email, 'Next Pizza / Оплатите заказ #' + order.id, PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: paymentUrl,
        }));
    return paymentUrl;

    }catch(error)  {
        console.log(" [CreateOrder] Server Error", error);
    }
}
