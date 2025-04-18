"use client"; // 화면 마크업 //
import React from "react";
import TextInput from "@/components/common/Input/TextInput";
import { EvenIcon } from "@/components/common/Icons";
import PasswordInput from "@/components/common/Input/PasswordInput";
import BaseButton from "@/components/common/Button/BaseButton";
import Link from "next/link";

const PasswordUpdateForm = () => {
  return (
    <div className="w-full max-w-[33rem] border border-white bg-gray900 p-6 mt-24">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <EvenIcon />
        <h1 className="text-4xl">even ide</h1>
      </div>
      <div className="text-xl text-white text-center">
        비밀번호 재설정
      </div>
      <p className="text-md text-white text-center pt-8 pb-10 gap-4">
        새로운 비밀번호를 설정하세요. 
      </p>

      <form className="w-full flex flex-col gap-8">
        <PasswordInput
          placeholder="비밀번호를 입력하세요."
          size="xl"
          className="text-white placeholder-white"
        />
        <PasswordInput
          placeholder="비밀번호 확인"
          size="xl"
          className="text-white placeholder-white"
        />
        <BaseButton type="submit" size="xl">
          확인
        </BaseButton>
      </form>

      <div className="flex justify-center mt-10 mb-8">
        <Link href="/login" className="text-md text-violet-400 underline hover:opacity-80 transition"
        >로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default PasswordUpdateForm;