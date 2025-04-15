import React from "react";
import AgreementItem from "./AgreementItem";
import { AgreementsState, AgreementsType } from "@/types/agreement";

interface AggrementListProps {
	agreements: AgreementsState;
	onToggle: (key: AgreementsType) => void;
}

const AgreementList = ({ agreements, onToggle }: AggrementListProps) => {
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
					// TODO: 약관 팝업 or 링크 연결
					console.log("약관 동의 클릭");
				}}
			/>
			<AgreementItem
				type="privacy"
				label="개인정보처리방침 동의"
				required
				checked={agreements.privacy}
				onToggle={onToggle}
				onTermClick={() => {
					// TODO: 약관 팝업 or 링크 연결
					console.log("개인정보처리방침 동의 클릭");
				}}
			/>
		</div>
	);
};

export default AgreementList;
