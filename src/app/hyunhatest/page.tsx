"use client";
import React, { useState } from "react";
import BaseButton from "@/components/common/Button/BaseButton";
import { EvenIcon } from "@/components/common/Icons";
import Popup from "@/components/loginpopup/Popup";

export default function HyunhaTestPage() {
  // 모달 표시 여부 상태
  const [showModal, setShowModal] = useState(false);

  // 폼 submit 시 모달을 띄우도록 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  // 모달 닫기 함수 (팝업 내부 혹은 외부에 배치)
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* 임시 페이지 내용 */}
      <div className="w-full max-w-[30rem] border border-white mt-16 p-6">
        <div className="flex justify-center items-center pt-8 pb-4 gap-4">
          <EvenIcon />
          <h1 className="text-4xl">임시 채팅창 연결용입니다</h1>
        </div>

        <div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h1 className="text-xl text-white text-center">
              미트볼 버튼을 누르면 로그인 유도 팝업이 모달로 표시됩니다.
            </h1>
            <BaseButton type="submit" size="xl">
              미트볼 버튼
            </BaseButton>
          </form>
        </div>
      </div>

      {/* 모달 오버레이 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <Popup />
            {/* 모달 닫기 버튼 */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
