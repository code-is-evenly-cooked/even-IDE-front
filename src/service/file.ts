import { fetchWithJson } from "@/lib/fetch";

export const requestToggleEditLock = async ({
  projectId,
  fileId,
  token,
}: {
  projectId: string;
  fileId: string;
  token: string;
}): Promise<{ editLocked: boolean }> => {
  return await fetchWithJson(
    `/api/projects/${projectId}/files/${fileId}/edit/lock`,
    {
      method: "PATCH",
      headers: { Authorization: token },
    }
  );
};
