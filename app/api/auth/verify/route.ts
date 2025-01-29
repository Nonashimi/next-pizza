import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code");

        if (!code) {
            return NextResponse.json({ error: 'Code not found' }, { status: 400 });
        }

        const verifyCode = await prisma.verificationCode.findFirst({
            where: { code },
        });

        if (!verifyCode) {
            return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: verifyCode.userId },
            data: { verified: new Date() },
        });

        await prisma.verificationCode.delete({
            where: { id: verifyCode.id },
        });

        return NextResponse.redirect(new URL('/?verified', req.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
