import prisma from "@/db"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url)
        const id = parseInt(searchParams.get('id'))
        const res = await prisma.News.findUnique({
            where: {
                id: id
            },
            include: {
                category: true
            }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}