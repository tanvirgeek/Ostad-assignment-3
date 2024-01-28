import { NextResponse } from "next/server"
import { verifyToken } from "./utility/jwtTokenHelper"

export async function middleware(req, res) {
    try {
        const token = req.cookies.get('token')
        const payload = await verifyToken(token['value'])
        const reqHeader = new Headers(req.headers)
        reqHeader.set('email', payload['email'])
        reqHeader.set('id', payload['id'])
        return NextResponse.next({ request: { headers: reqHeader } })
    } catch (e) {
        const reqHeader = new Headers(req.headers)
        reqHeader.set('email', "")
        reqHeader.set('id', "")
        return NextResponse.next({ request: { headers: reqHeader } })
    }
}