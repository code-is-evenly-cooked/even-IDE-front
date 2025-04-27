import { axiosInstance } from "@/lib/axiosInstance";
import { getAuthCookie } from "@/lib/cookie";

export const createMemo = async ({ projectId, fileId, memo }: { projectId: number, fileId: string, memo: string }) => {
    const { accessToken } = getAuthCookie();
    const res = await axiosInstance.post(
        `/projects/${projectId}/file/${fileId}/memos`,
        { memo },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
};

export const fetchMemos = async (projectId: number, fileId: string) => {
    const res = await axiosInstance.get(`/projects/${projectId}/files/${fileId}/memos`);
    const memos = res.data;

    return memos.map((memo: any) => ({
        id: memo.memoId,
        file_id: Number(fileId),
        file_name: memo.fileName || "",
        line_number: 1,
        content: memo.memo,
        code_snapshot: "",
        created_at: memo.createdAt || "",
        writerId: memo.writerId?.toString(),
        writerNickName: memo.writerNickName,
    }));
};

export const deleteMemoApi = async (projectId: number, fileId: string, memoId: number) => {
    const { accessToken } = getAuthCookie();
    const res = await axiosInstance.delete(
        `/projects/${projectId}/file/${fileId}/memos/${memoId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
};

export const updateMemoApi = async (projectId: number, fileId: number, memoId: number, memo: string) => {
    const { accessToken } = getAuthCookie();
    const res = await axiosInstance.patch(
        `/projects/${projectId}/file/${fileId}/memos/${memoId}`,
        { memo },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
};