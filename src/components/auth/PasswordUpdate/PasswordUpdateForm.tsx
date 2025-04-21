"use client"; // 화면 마크업 //

import React, { useState } from "react";
import TextInput from "@/components/common/Input/TextInput";
import BaseButton from "@/components/common/Button/BaseButton";
import { EvenIcon } from "@/components/common/Icons";
import Link from "next/link";
import useResetPasswordForm from "../PasswordReset/usePasswordResetForm";

const PasswordUpdateForm = () => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = () => {};

  return(
    <div className="w-full max-w-[28rem] border border-white mt-16">
      <div className="flex justify-center items-center pt-8 pb-1 gap-4">
        <EvenIcon />
        <h1 className="text-4xl">even ide</h1>
      </div>
      <div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
				<form  className="flex flex-col gap-6">
					<h1 className="text-xl text-center mb-2">비밀번호 재설정</h1>
					<h2 className="text-md text-center leading-loose mb-4">
						새로운 비밀번호를 설정하세요.
						<br />						
					</h2>

          <TextInput
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={handlePasswordChange}
          size="xl"
          />
          <TextInput
          placeholder="비밀번호 확인"
          value={password}
          onChange={handlePasswordChange}          
          size="xl"
          />

          <BaseButton type="submit" size="xl" >
            확인
          </BaseButton>
          
          <div className="flex justify-center text-sm text-violet-400 font-light mt-2 mb-4">
            <Link href="/login" className="underline hover:opacity-80 transition"
            >
             로그인으로 돌아가기
            </Link>
          </div>
        </form>            
      </div>
    </div>
  );
};

export default PasswordUpdateForm;