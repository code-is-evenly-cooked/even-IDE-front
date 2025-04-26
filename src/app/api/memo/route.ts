import { handleAPIResponse } from "@/lib/api";
import { createErrorResponse } from "@/lib/response";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 메모 리스트 조회 (GET)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const fileId = searchParams.get("fileId");

    if (!projectId || !fileId) {
        return NextResponse.json(
            { error: "projectId와 fileId는 필수입니다." },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/projects/${projectId}/file/${fileId}/memos`
        );

        return await handleAPIResponse(response, "메모 조회 실패");
    } catch (err) {
        console.error("[GET /memos]", err);
        return createErrorResponse("메모 조회 중 오류 발생", 500);
    }
}

// 메모 생성 (POST)
export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const fileId = searchParams.get("fileId");

    if (!projectId || !fileId) {
        return NextResponse.json(
            { error: "projectId와 fileId는 필수입니다." },
            { status: 400 }
        );
    }

    try {
        const { memo } = await req.json();

        const response = await fetch(
            `${API_BASE_URL}/projects/${projectId}/file/${fileId}/memos`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memo }),
            }
        );

        return await handleAPIResponse(response, "메모 생성 실패");
    } catch (err) {
        console.error("[POST /memos]", err);
        return createErrorResponse("메모 생성 중 오류 발생", 500);
    }
}