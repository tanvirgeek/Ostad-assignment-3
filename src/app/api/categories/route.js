import prisma from "@/db"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const res = await prisma.Category.findMany({
            select: { id: true, name: true }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}