import Image from "next/image";

interface IconProps {
	className?: string;
}
export const EyeIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/eye.svg"
			alt="비밀번호 보기"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const EyeCloseIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/eyeClose.svg"
			alt="비밀번호 숨기기"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const GoogleIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/google.svg"
			alt="구글 로그인"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const KakaoIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/kakao.svg"
			alt="카카오 로그인"
			width={24}
			height={24}
			className={className}
			priority
		/>
	);
};

export const EvenIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/even.svg"
			alt="이븐"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const EvenBigIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/evenBig.svg"
			alt="이븐"
			width={80}
			height={80}
			className={className}
			priority
		/>
	);
};

export const FileNewIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/fileNew.svg"
			alt="새 파일"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const FolderNewIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/folderNew.svg"
			alt="새 프로젝트"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const BackIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/back.svg"
			alt="되돌리기"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const CloseIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/close2.svg"
			alt="닫기"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const FileIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/file.svg"
			alt="닫기"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const FolderIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/folder.svg"
			alt="닫기"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const QrcodeIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/qrcode.svg"
			alt="닫기"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const QnaIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/qna.svg"
			alt="닫기"
			width={40}
			height={40}
			className={className}
			priority
		/>
	);
};

export const ChatTransferIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/chatTransfer.svg"
			alt="닫기"
			width={36}
			height={36}
			className={className}
			priority
		/>
	);
};

export const AIIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/icon-ai.svg"
			alt="AI 아이콘"
			width={16}
			height={16}
			className={className}
			priority
		/>
	);
};

export const MinusCloseIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/minus_close.svg"
			alt="닫기"
			width={36}
			height={36}
			className={className}
			priority
		/>
	);
};

export const GhostIcon = ({ className }: IconProps) => {
	return (
		<svg
			className={className}
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.75563 8.23799C8.98126 8.38849 8.20601 7.98862 8.02401 7.34462L10.8301 6.79862C11.0104 7.44349 10.53 8.08662 9.75563 8.23799V8.23799ZM5.19163 8.23799C4.41726 8.08662 3.93688 7.44349 4.11888 6.79949L6.92238 7.34462C6.74126 7.98862 5.96601 8.38849 5.19163 8.23799V8.23799ZM12.7228 6.96837C12.7228 4.20949 10.3699 2.18999 7.47451 2.19962C4.57913 2.18999 2.22363 4.20949 2.22363 6.96837L2.23326 13.5746L3.91851 12.7224L5.73676 13.5746L7.41588 12.7224L9.23063 13.5746L10.9089 12.7224L12.7236 13.5746L12.7228 6.96837Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const MenuIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/menu.svg"
			alt="닫기"
			width={30}
			height={30}
			className={className}
			priority
		/>
	);
};

export const MemoIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/memo.svg"
			alt="메모 아이콘 미선택"
			width={16}
			height={16}
			className={className}
			priority
		/>
	);
};

export const SelectedMemoIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/selectedMemoIcon.svg"
			alt="메모 아이콘 선택"
			width={16}
			height={16}
			className={className}
			priority
		/>
	);
};