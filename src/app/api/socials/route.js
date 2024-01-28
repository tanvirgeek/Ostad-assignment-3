import prisma from "@/db"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        const res = await prisma.Policies.findMany()
        return NextResponse.json({ status: "Success", data: res })
    } catch (err) {
        return NextResponse.json({ status: "Fail", error: err }, { status: 500 })
    }
}