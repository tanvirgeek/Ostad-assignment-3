import prisma from "@/db"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url)
        const keyword = searchParams.get('keyword')
        const res = await prisma.News.findMany({
            where: {
                title: {
                    contains: keyword
                }
            }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}