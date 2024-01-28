
import prisma from "@/db";
import { sendEmail } from "@/utility/emailUtility";
import { NextResponse } from "next/server";


export async function GET(req, res) {
    try {
        let { searchParams } = new URL(req.url);
        let email = searchParams.get("email");

        const count = await prisma.User.count({
            where: { email: email },
        });

        if (count === 1) {
            const code = Math.floor(100000 + Math.random() * 900000);
            const emailText = `Your OTP code is ${code}`;
            const emailSubject = "Next News Verification Code.";
            await sendEmail(email, emailText, emailSubject);

            let result = await prisma.User.update({
                where: { email: email },
                data: { otp: code.toString() },
            });

            return NextResponse.json({ status: "Success", data: result });
        }
    } catch (e) {
        return NextResponse.json({ status: "Fail", data: e }, { status: 500 });
    }
}