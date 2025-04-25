const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 전체 프로젝트 조회
export const fetchAllProjects = async (token: string) => {
  const res = await fetch(`${API_BASE_URL}/editor`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`프로젝트 목록 조회 실패: ${error}`);
  }

  return await res.json(); // ProjectResponse[] 타입 추론됨
};

// 프로젝트 생성
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

  console.log("🎯 프로젝트 생성 응답 data:", data);

  // ✅ projectId가 숫자인지 먼저 확인
  const parsedId = typeof data.id === "number" ? data.id : Number(data.id);

  if (Number.isNaN(parsedId)) {
    console.warn("⚠️ projectId 값이 NaN입니다. 응답을 확인해주세요.");
  }

  return {
    id: data.sharedUUID, //  UUID
    name: data.projectName, //  프로젝트 이름
    projectId: Number(data.id), //  숫자형 projectId
  };
};

// 프로젝트 단 건 리스트 조회 (비로그인 가능)
export const fetchProject = async (uuid: string, token?: string) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}/projects/${uuid}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`프로젝트 조회 실패: ${error}`);
  }

  return await res.json();
};

// 프로젝트 이름 변경
export const updateProjectName = async (
  projectId: number,
  name: string,
  ownerId: number,
  token: string
) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectName: name, ownerId: ownerId }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`프로젝트 이름 변경 실패: ${error}`);
  }

  return await res.json();
};

// 프로젝트 삭제
export const deleteProject = async (projectId: number, token: string) => {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`프로젝트 삭제 실패: ${error}`);
  }
};
