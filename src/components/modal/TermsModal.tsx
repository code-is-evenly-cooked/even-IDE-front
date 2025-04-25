"use client";
import React from "react";
import IconButton from "@/components/common/Button/IconButton";
import { CloseIcon, EvenIcon } from "@/components/common/Icons";
import ReactMarkdown from "react-markdown";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const TermsModal = ({ open, onClose, title, content }: TermsModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[40rem] max-h-[80vh] bg-gray700 p-4 rounded-xl overflow-y-auto scrollbar-thumb"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col pt-1 pb-2">
            <div className="flex justify-end">
              <IconButton
                icon={<CloseIcon />}
                label="닫기"
                size="sm"
                transparent
                onClick={onClose}
              />
            </div>
            <div className="flex justify-center items-center gap-4 pb-3">
              <EvenIcon />
              <h1 className="text-3xl">even ide</h1>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="text-3xl text-white font-semibold">{title}</h1>
            </div>
            <div className="text-sm text-white whitespace-pre-wrap pt-5">
              <div
                className="prose prose-invert max-w-none leading-[1.3] [&_p]:my-0 [&_h3]:my-0.5 [&_h4]:my-0.5 [&_li]:my-0 [&_ul]:my-0
 text-white text-sm"
              >
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
