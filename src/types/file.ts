export interface FileItem {
  id: string;
  name: string;
  content: string;
  projectId: string;
  language: string;
  updatedAt: string;
  ownerId: number;
  locked: boolean;
  editLocked: boolean;
}
