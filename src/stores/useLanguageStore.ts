import { create } from "zustand";

// 전역 상태에서 사용할 타입 정의
type LanguageState = {
  language: string; // 선택된 언어
  setLanguage: (lang: string) => void; // 언어를 변경하는 함수
};

// Zustand store 생성
export const useLanguageStore = create<LanguageState>((set) => ({
  language: "JavaScript", // 기본 언어
  setLanguage: (lang: string) => set({ language: lang }),
}));
