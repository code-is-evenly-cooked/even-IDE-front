"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const isEditorPage = pathname.startsWith("/editor");

  return (
    <header
      className={`w-full h-[3rem] flex justify-between items-center p-4 ${
        isEditorPage ? "hidden" : ""
      }`}
    >
      <div></div>
      <div className="flex">
        <Link href="/login">
          <span className="text-link">로그인</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
