const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/* 파일 생성 API */
export const createFile = async (
  projectId: number,
  fileName: string,
  token: string
) => {
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

/* 파일 코드, 파일 언어 저장 API */
export const updateFileCode = async (
  projectId: string,
  fileId: string,
  fileName: string,
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
        fileName,
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

/* 파일 이름 변경 API */
export const updateFileName = async (
  fileId: string,
  newName: string,
  token: string
) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/files/${fileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`파일 이름 변경 실패: ${error}`);
  }

  return res.json(); // 서버 응답 사용 가능
};

/* 파일 삭제 API */
export const deleteFileById = async (
  projectId: number,
  fileId: string,
  token: string
) => {
  const res = await fetch(
    `${API_BASE_URL}/projects/${projectId}/files/${fileId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`파일 삭제 실패: ${error}`);
  }

  const result = await res.json();
  if (result.message !== "success") {
    throw new Error(`파일 삭제 응답 실패: ${JSON.stringify(result)}`);
  }

  return result;
};
