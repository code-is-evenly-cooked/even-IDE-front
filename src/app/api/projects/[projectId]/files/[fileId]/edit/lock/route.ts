import { NextRequest } from "next/server";
import { createErrorResponse } from "@/lib/response";
import { handleAPIResponse } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ projectId: string; fileId: string }> }
) {
	try {
		const { projectId, fileId } = await params;
		const token = req.headers.get("authorization");

		const response = await fetch(
			`${API_BASE_URL}/projects/${projectId}/files/${fileId}/edit/lock`,
			{
				method: "PATCH",
				headers: {
					Authorization: token || "",
				},
			}
		);
		console.log(response);

		return await handleAPIResponse(response, "잠금 토글 실폐");
	} catch (err) {
		console.error("[PATCH /code/edit-lock] 요청 실패", err);

		const message =
			err instanceof Error ? err.message : "Unexpected error occurred";

		return createErrorResponse(message, 500); // 메시지를 그대로 담아줘!
	}
}
