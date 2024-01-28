import prisma from "@/db"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const headerList = headers()
        const id = parseInt(headerList.get('id'))
        const res = await prisma.Comment.findMany({
            where: { userId: id },
            include: {
                News: {
                    select: {
                        title: true
                    }
                }
            }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}

export async function POST(req, res) {
    try {
        const headerList = headers()
        const id = parseInt(headerList.get('id'))
        const reqBody = await req.json()
        reqBody.userId = id
        const res = await prisma.Comment.create({
            data: { reqBody }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}

export async function DELETE(req, res) {
    try {
        const headerList = headers()
        const userId = parseInt(headerList.get('id'))
        const reqBody = await req.json()
        const commentId = parseInt(reqBody('id'))
        const res = await prisma.Comment.delete({
            where: {
                AND: {
                    userId: userId,
                    id: commentId
                }
            }
        })
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}