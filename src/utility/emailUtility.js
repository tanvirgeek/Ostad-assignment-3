import nodemailer from 'nodemailer'
export async function sendEmail(emailTo, emailText, emailSubject) {
    let transPort = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: "~sR4[bhaC[Qs"
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: "NextJS News Portal <info@teamrabbil.com>",
        to: emailTo,
        subject: emailSubject,
        text: emailText
    }

    return await transPort.sendMail(mailOptions)
}