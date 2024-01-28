import prisma from "@/db";
import { sendEmail } from "@/utility/emailUtility";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        let reqBody = await req.json()
        const count = await prisma.User.count({
            where: reqBody
        })
        if (count === 1) {
            return NextResponse.json({ status: "Success", data: "Valid OTP Code" }, { status: 200 });
        } else {
            return NextResponse.json({ status: "Fail", data: "Invalid OTP Code" }, { status: 404 });
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: "Fail", data: e }, { status: 500 });
    }
}