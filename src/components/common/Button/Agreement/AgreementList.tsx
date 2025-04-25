import React, { useEffect, useState } from "react";
import AgreementItem from "./AgreementItem";
import { AgreementsState, AgreementsType } from "@/types/agreement";
import TermsModal from "@/components/modal/TermsModal";

interface AggrementListProps {
  agreements: AgreementsState;
  onToggle: (key: AgreementsType) => void;
}

const AgreementList = ({ agreements, onToggle }: AggrementListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const [termsText, setTermsText] = useState("");
  const [privacyText, setPrivacyText] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const termsRes = await fetch("/terms/terms-of-service.md");
      const privacyRes = await fetch("/terms/privacy-policy.md");
      const terms = await termsRes.text();
      const privacy = await privacyRes.text();
      setTermsText(terms);
      setPrivacyText(privacy);
    };
    fetchMarkdown();
  }, []);

  const handleTermClick = (type: "terms" | "privacy") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="text-white text-sm w-full">
      <AgreementItem
        type="all"
        label="약관 전체 동의"
        checked={agreements.all}
        onToggle={onToggle}
      />
      <div className="h-px bg-gray500 my-2" />
      <AgreementItem
        type="terms"
        label="even 이용 약관 동의"
        required
        checked={agreements.terms}
        onToggle={onToggle}
        onTermClick={() => {
          handleTermClick("terms");
        }}
      />
      <AgreementItem
        type="privacy"
        label="개인정보처리방침 동의"
        required
        checked={agreements.privacy}
        onToggle={onToggle}
        onTermClick={() => {
          handleTermClick("privacy");
        }}
      />
      <TermsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalType === "terms" ? "이용약관" : "개인정보처리방침"}
        content={modalType === "terms" ? termsText : privacyText}
      />
    </div>
  );
};

export default AgreementList;
