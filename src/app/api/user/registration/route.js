import prisma from "@/db"
import { NextResponse } from "next/server"

export async function POST(req, res) {
    try {
        let reqBody = await req.json()
        reqBody.otp = "0"
        const res = await prisma.User.create({
            data: reqBody
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}