import prisma from "@/db";
import { headers } from "next/headers";

import { NextResponse } from "next/server";


export async function GET(req, res) {
    try {
        let headerList = headers()
        let id = parseInt(headerList.get('id'))
        const result = await prisma.User.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({ status: "Success", data: result }, { status: 200 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: "Fail", data: e }, { status: 500 });
    }
}