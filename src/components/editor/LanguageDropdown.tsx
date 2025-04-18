"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";

const languages = ["Java", "Javascript", "Python"];

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>  document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="flex border rounded pl-4 pr-4 py-1.5">
      <button onClick={() => setOpen(!open)} className="flex">
        <span className="mr-8">{language}</span>
        <div>▼</div>
      </button>

      {open && (
        <ul>
          {languages.map((lang) => (
            <li
            key={lang}
            onClick={() => {
                setLanguage(lang);
                setOpen(false);
            }}
            className={`px-4 py-2 hover:bg-gray500 cursor-pointer ${lang === language ? "bg-gray700 font-semibold" : ""}`}
            >
                {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
