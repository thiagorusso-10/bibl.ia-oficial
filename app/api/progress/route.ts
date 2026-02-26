import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/access";
import { toggleProgress, getUserProgress } from "@/lib/progress";

// GET /api/progress — list user's progress
export async function GET() {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progress = await getUserProgress(user.id);
    return NextResponse.json({ progress });
}

// POST /api/progress — toggle a content item as read/unread
export async function POST(req: NextRequest) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { contentItemId } = body;

    if (!contentItemId || typeof contentItemId !== "string") {
        return NextResponse.json(
            { error: "Missing contentItemId" },
            { status: 400 }
        );
    }

    const isCompleted = await toggleProgress(user.id, contentItemId);

    return NextResponse.json({ isCompleted, contentItemId });
}
