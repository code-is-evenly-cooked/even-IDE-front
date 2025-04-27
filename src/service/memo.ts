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
    const { accessToken } = getAuthCookie();
    const res = await axiosInstance.get(
        `/projects/${projectId}/file/${fileId}/memos`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
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