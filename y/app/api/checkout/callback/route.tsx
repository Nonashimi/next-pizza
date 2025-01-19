import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { PaySucceeded } from "@/shared/components/shared/email-templates/pay-succeeded";
import { sendEmail } from "@/shared/lib/send-email";
import { CartItemDTO } from "@/shared/services/DTO/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try{

        const body = (await req.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id),
            },
        });

        if(!order){
            return NextResponse.json({error: "Order not found"});
        }

        const isSucceeded = body.object.status === "succeeded";
        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                Status: isSucceeded?OrderStatus.SUCCEEDED: OrderStatus.CANCELED
            }
        });

        const items = JSON.parse(order?.items as string) as CartItemDTO[];

        if(isSucceeded){
            await sendEmail(order.email, `Next Pizza / #${order.id} Заказ оплачен`, PaySucceeded({
                orderId: order.id,
                items: items
            }));
        }

    }catch(error){
        console.log(
            "[Checkout Callback] Error:", error
        )


        return  NextResponse.json({error: "Server error"});
    }
}