import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newMessage = await Message.create({ name, email, message });

        return NextResponse.json(
            { message: "Message sent successfully", data: newMessage },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
