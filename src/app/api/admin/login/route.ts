import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "123456"; // Default for testing if not set
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        if (code === ADMIN_PASSCODE) {
            const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

            const response = NextResponse.json(
                { message: "Login successful" },
                { status: 200 }
            );

            response.cookies.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600,
                path: "/",
            });

            return response;
        }

        return NextResponse.json(
            { error: "Invalid passcode" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
