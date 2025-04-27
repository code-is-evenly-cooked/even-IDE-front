import {handleAPIResponse} from "@/lib/api";
import {createErrorResponse} from "@/lib/response";
import {NextRequest, NextResponse} from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Context {
    params: {
        memoId: string;
    };
}

// 메모 단건 조회 (GET)
export async function GET(req: NextRequest, context: Context) {
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const fileId = searchParams.get("fileId");
    const {memoId} = context.params;

    if (!projectId || !fileId || !memoId) {
        return NextResponse.json(
            {error: "projectId, fileId, memoId는 필수입니다."},
            {status: 400}
        );
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/projects/${projectId}/files/${fileId}/memos/${memoId}`
        );
        return await handleAPIResponse(response, "메모 단건 조회 실패");
    } catch (err) {
        console.error("[GET /memos/:memoId]", err);
        return createErrorResponse("메모 단건 조회 중 오류 발생", 500);
    }
}

// 메모 수정 (PATCH)
export async function PATCH(req: NextRequest, context: Context) {
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const fileId = searchParams.get("fileId");
    const {memoId} = context.params;

    if (!projectId || !fileId || !memoId) {
        return NextResponse.json(
            {error: "projectId, fileId, memoId는 필수입니다."},
            {status: 400}
        );
    }

    try {
        const {memo} = await req.json();
        const response = await fetch(
            `${API_BASE_URL}/projects/${projectId}/files/${fileId}/memos/${memoId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({memo}),
            }
        );
        return await handleAPIResponse(response, "메모 수정 실패");
    } catch (err) {
        console.error("[PATCH /memos/:memoId]", err);
        return createErrorResponse("메모 수정 중 오류 발생", 500);
    }
}

// 메모 삭제 (DELETE)
export async function DELETE(req: NextRequest, context: Context) {
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const fileId = searchParams.get("fileId");
    const {memoId} = context.params;

    if (!projectId || !fileId || !memoId) {
        return NextResponse.json(
            {error: "projectId, fileId, memoId는 필수입니다."},
            {status: 400}
        );
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/projects/${projectId}/files/${fileId}/memos/${memoId}`,
            {
                method: "DELETE",
            }
        );
        return await handleAPIResponse(response, "메모 삭제 실패");
    } catch (err) {
        console.error("[DELETE /memos/:memoId]", err);
        return createErrorResponse("메모 삭제 중 오류 발생", 500);
    }
}