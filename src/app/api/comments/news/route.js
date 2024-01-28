import prisma from "@/db"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url)
        const postId = parseInt(searchParams.get('postId'))
        const res = await prisma.Comment.findMany({
            where: { postId: postId },
            include: {
                User: {
                    select: {
                        firstName: true, lastName: true
                    }
                }
            }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}