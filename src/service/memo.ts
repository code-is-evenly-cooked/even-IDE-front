import { axiosInstance } from "@/lib/axiosInstance";

export const createMemo = async ({projectId, fileId, memo}: { projectId: number, fileId: string, memo: string }) => {
    const res = await axiosInstance.post(`/projects/${projectId}/files/${fileId}/memos`, { memo });
    return res.data;
};

export const fetchMemos = async (projectId: number, fileId: string) => {
    const res = await axiosInstance.get(`/projects/${projectId}/files/${fileId}/memos`);
    return res.data;
};

export const deleteMemoApi = async (projectId: number, fileId: string, memoId: number) => {
    const res = await axiosInstance.delete(`/projects/${projectId}/files/${fileId}/memos/${memoId}`);
    return res.data;
};