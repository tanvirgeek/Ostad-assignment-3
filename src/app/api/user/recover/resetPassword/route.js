import prisma from "@/db";
import { sendEmail } from "@/utility/emailUtility";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        let reqBody = await req.json()
        const count = await prisma.User.count({
            where: {
                email: reqBody['email'],
                otp: reqBody['otp']
            }
        })
        if (count === 1) {
            await prisma.User.update({
                where: {
                    email: reqBody['email']
                },
                data: {
                    otp: "0",
                    password: reqBody['password']
                }
            })
            return NextResponse.json({ status: "Success", data: "Password reset success" }, { status: 200 });
        } else {
            return NextResponse.json({ status: "Fail", data: "Password reset fail" }, { status: 404 });
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: "Fail", data: e }, { status: 500 });
    }
}