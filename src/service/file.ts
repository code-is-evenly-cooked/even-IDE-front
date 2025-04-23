const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createFile = async (projectId: number, fileName: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}/files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fileName }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
};
  
  export const updateFileCode = async (
    projectId: string,
    fileId: string,
    filename: string,
    language: string,
    content: string,
    token: string
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}/files/${fileId}/code`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileId: Number(fileId), // 서버는 숫자로 필요할 수 있음
          filename,
          language,
          content,
        }),
      }
    );
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`파일 저장 실패: ${errorText}`);
    }
  
    return await res.json();
  };
  