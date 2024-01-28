import { jwtVerify, SignJWT } from "jose";

export async function createToken(email, id) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payLoad = { email: email, id: id }
    let token = await new SignJWT(payLoad)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(secret)
    return token
}

export async function verifyToken(token) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const decoded = await jwtVerify(token, secret)
    return decoded['payload']
}