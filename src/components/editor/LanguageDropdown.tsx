"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useIdeStore } from "@/stores/useIdeStore";

const languages = ["Java", "Javascript", "Python"];

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguageStore();
  const { currentFileId, updateFileLanguage } = useIdeStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-[150px] border rounded px-4 py-1.5"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between"
      >
        <span className="">{language}</span>
        <div>▼</div>
      </button>

      {open && (
        <ul className="absolute top-0 left-0 z-10 w-[150px] max-h-[119px] mt-[42px] pr-1 bg-gray900 overflow-y-scroll scrollbar-thumb">
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => {
                setLanguage(lang);
                if (currentFileId) {
                  updateFileLanguage(currentFileId, lang); // 새로운 함수로 파일 상태 내 언어도 바꿔줌
                }
                setOpen(false);
              }}
              className={`px-4 py-2 hover:bg-gray500 cursor-pointer ${
                lang === language ? "font-semibold" : ""
              }`}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
