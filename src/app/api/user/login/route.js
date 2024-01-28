import prisma from "@/db"
import { createToken } from "@/utility/jwtTokenHelper"
import { NextResponse } from "next/server"

export async function POST(req, res) {
    try {
        let reqBody = await req.json()
        const result = await prisma.User.findUnique({
            where: reqBody
        })

        if (!result) {
            return NextResponse.json({ status: "Fail", data: result }, { status: 404 })
        } else {
            console.log(result["email"], result["id"])
            let token = await createToken(result["email"], result["id"])
            let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000)
            const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`
            return NextResponse.json({ status: "Success", data: token }, { status: 200, headers: { 'set-cookie': cookieString } })
        }
    } catch (e) {
        return NextResponse.json({ status: "Fail", data: e })
    }
}