"use client";

import { useState, useRef } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";

const languages = ["Java", "Javascript", "Python"];

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


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
            ></li>
          ))}
        </ul>
      )}
    </div>
  );
}
