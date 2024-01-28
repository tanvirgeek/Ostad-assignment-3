import prisma from "@/db"
import { NextResponse } from "next/server"
import { headers } from "next/headers";

export async function POST(req, res) {
    try {
        let headerList = headers()
        let id = parseInt(headerList.get('id'))
        let reqBody = await req.json()
        const res = await prisma.User.update({
            where: { id: id },
            data: reqBody
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}