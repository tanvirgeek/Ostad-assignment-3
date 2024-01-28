import prisma from "@/db"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = parseInt(searchParams.get('categoryId'))
        const res = await prisma.News.findMany({
            where: { categoryId: categoryId }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}