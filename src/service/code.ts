const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const executeCode = async (
  language: string,
  content: string
): Promise<{ output: string }> => {
  const res = await fetch(`${API_BASE_URL}/code/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language, content }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`코드 실행 실패: ${error}`);
  }

  return await res.json(); // { output: string }
};
