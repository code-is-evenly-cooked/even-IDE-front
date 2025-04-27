"use client";
import React from "react";
import IconButton from "@/components/common/Button/IconButton";
import { CloseIcon, EvenIcon } from "@/components/common/Icons";

interface ManualModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const ManualModal = ({ open, onClose, title }: ManualModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-[40rem] max-h-[80vh] bg-gray700 p-4 rounded-xl overflow-y-auto scrollbar-thumb"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className="absolute top-4 right-4">
          <IconButton
            icon={<CloseIcon />}
            label="닫기"
            size="sm"
            transparent
            onClick={onClose}
          />
        </div>

        {/* 로고 + 타이틀 */}
        <div className="flex flex-col items-center pt-6">
          <div className="flex justify-center items-center gap-4 pb-3">
            <EvenIcon />
            <h1 className="text-3xl text-white">even ide</h1>
          </div>
          <h2 className="text-2xl text-white font-semibold mb-6">{title}</h2>

          {/* Manual 내용 */}
          <div className="text-white text-sm flex flex-col gap-6 w-full">
            {/* 1. 프로젝트/파일 관리 */}
            <section>
              <h3 className="text-xl font-bold mb-4">프로젝트/파일 관리</h3>

              <div className="flex flex-col gap-2">
                <ManualItem
                  icon="/icons/even.svg"
                  text="  로고 클릭 시 에디터 화면으로 이동합니다."
                />
                <ManualItem
                  icon="/icons/folderNew.svg"
                  text="  새 프로젝트를 생성합니다."
                />
                <ManualItem
                  icon="/icons/fileNew.svg"
                  text="  새 파일을 생성합니다."
                />
                <ManualItem
                  icon="/icons/back.svg"
                  text="  프로젝트 선택 후 버튼 클릭 시 프로젝트 페이지(공유 가능한 url)로 이동합니다."
                />
                <ManualItem
                  icon="/icons/close.svg"
                  text="  프로젝트 또는 파일 클릭 후 버튼 클릭 시 해당 프로젝트 또는 파일이 삭제됩니다."
                />
                <ManualItem
                  icon="/icons/folder.svg"
                  text="  프로젝트 이름 클릭 시 프로젝트를 엽니다."
                />
                <ManualItem
                  icon="/icons/file.svg"
                  text="  파일 이름 클릭 시 파일을 엽니다."
                />
              </div>
            </section>

            <hr className="border-gray500" />

            {/* 2. 에디터 */}
            <section>
              <h3 className="text-xl font-bold mb-4">에디터</h3>

              <div className="flex flex-col gap-2">
                <ManualText text="실행 ▶ 언어 선택 후 실행 버튼을 클릭하면 에디터에서 작성한 코드가 실행됩니다." />
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
                      <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
                    </svg>
                  }
                  text="  작성한 코드는 저장이 가능합니다."
                />
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-download w-5 h-5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                  }
                  text="  코드를 로컬에 저장할 수 있습니다."
                />

                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-upload w-5 h-5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                  }
                  text="  가져오기 기능입니다. (미지원)"
                />
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-share2 lucide-share-2 w-5 h-5"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                    </svg>
                  }
                  text="  ⇨ 링크 또는 QR로 프로젝트를 공유할 수 있습니다."
                />
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-github w-6 h-6"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  }
                  text=" code is evenly cooked 깃허브 레포를 구경하세요."
                />
                <ManualItem
                  icon="/icons/qna.svg"
                  text="  사용자 메뉴얼을 확인 할 수 있습니다."
                />
              </div>
            </section>

            <hr className="border-gray500" />

            {/* 3. 채팅 및 AI 기능 */}
            <section>
              <h3 className="text-xl font-bold mb-4">채팅 및 AI 기능</h3>

              <div className="flex flex-col gap-2">
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-message-circle-code"
                    >
                      <path d="M10 9.5 8 12l2 2.5"></path>
                      <path d="m14 9.5 2 2.5-2 2.5"></path>
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"></path>
                    </svg>
                  }
                  text=" 프로젝트 별 채팅을 이용할 수 있습니다."
                />
                <ManualItem
                  icon="/icons/chatTransfer.svg"
                  text=" 채팅 창 크기를 조절합니다."
                />
                <ManualItem
                  icon="/icons/minus_close.svg"
                  text=" 현재 탭을 닫습니다."
                />

                <ManualItem
                  icon="/icons/icon-ai.svg"
                  text=" AI 기능을 활용할 수 있습니다."
                />
              </div>
            </section>

            <hr className="border-gray500" />

            {/* 4. 회원 기능 */}
            <section>
              <h3 className="text-xl font-bold mb-4">회원 기능</h3>

              <div className="flex flex-col gap-2">
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-log-in"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" x2="3" y1="12" y2="12"></line>
                    </svg>
                  }
                  text="  로그인"
                />
                <ManualText
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" x2="9" y1="12" y2="12"></line>
                    </svg>
                  }
                  text="  로그아웃"
                />
              </div>
            </section>

						<hr className="border-gray500" />
						<span>CodeIsEvenlyCooked ⓒ 2025</span>
						<span>문의 | codeisevenlycooked@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;

/* 서브 컴포넌트 */

const ManualItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-2">
    <img src={icon} alt="" className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

const ManualText = ({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    {icon && icon}
    <span>{text}</span>
  </div>
);
