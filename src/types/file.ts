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

export interface UpdateFileCodeResponse {
  fileId: number;
  filename: string;
  language: string;
  content: string;
  updatedAt: string;
  ownerId: number;
  locked: boolean;
  editLocked: boolean;
}