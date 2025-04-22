const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createProject = async (
  name: string,
  token: string,
  ownerId: number
) => {

  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      projectName: name,
      ownerId: ownerId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "프로젝트 생성 실패");
  }

  const data = await res.json();

  return {
    id: data.sharedUUID,
    name: data.projectName,
    projectId: data.id,
  };
};

export const fetchProject = async (uuid: string, token: string) => {
    const res = await fetch(`${API_BASE_URL}/projects/${uuid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`프로젝트 조회 실패: ${error}`);
    }
  
    return await res.json();
  };
