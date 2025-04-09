import { create } from 'zustand';

type CodeStore = {
  code: string;
  setCode: (newCode: string) => void;
};

export const useCodeStore = create<CodeStore>((set) => ({
  code: '',
  setCode: (newCode: string) => set({ code: newCode }),
}));
