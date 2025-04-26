export const fetchMemos = async (projectId: number, fileId: string) => {
    const res = await fetch(`/api/memo?projectId=${projectId}&fileId=${fileId}`);
    if (!res.ok) throw new Error("메모 조회 실패");
    return res.json();
};

export const createMemo = async (
    projectId: number,
    fileId: string,
    memo: string
) => {
    const res = await fetch(`/api/memo?projectId=${projectId}&fileId=${fileId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({memo}),
    });
    if (!res.ok) throw new Error("메모 생성 실패");
    return res.json();
};

export const updateMemo = async (
    projectId: number,
    fileId: string,
    memoId: number,
    memo: string
) => {
    const res = await fetch(
        `/api/memo/${memoId}?projectId=${projectId}&fileId=${fileId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({memo}),
        }
    );
    if (!res.ok) throw new Error("메모 수정 실패");
    return res.json();
};

export const deleteMemo = async (
    projectId: number,
    fileId: string,
    memoId: number
) => {
    const res = await fetch(
        `/api/memo/${memoId}?projectId=${projectId}&fileId=${fileId}`,
        {
            method: "DELETE",
        }
    );
    if (!res.ok) throw new Error("메모 삭제 실패");
    return res.json();
};