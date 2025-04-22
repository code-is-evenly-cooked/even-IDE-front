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

export const MemoIcon = ({ className }: IconProps) => {
	return (
		<Image
			src="/icons/memo-icon.svg"
			alt="메모 아이콘"
			width={16}
			height={16}
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
