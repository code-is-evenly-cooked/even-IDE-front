export const createProject = async (name: string, token: string) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    const res = await fetch(`${API_BASE_URL}/api/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "프로젝트 생성 실패");
    }
  
    const data = await res.json();
  
    return {
      id: data.shareUUID,
      name: data.name,
    };
  };
  