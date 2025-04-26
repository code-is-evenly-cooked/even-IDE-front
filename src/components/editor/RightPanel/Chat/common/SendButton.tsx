import { ArrowUpIcon } from "lucide-react";
import clsx from "clsx";

interface SendButtonProps {
	disabled?: boolean;
	onClick?: () => void;
}

const SendButton = ({ disabled, onClick }: SendButtonProps) => {
	return (
		<button
			type="button"
			disabled={disabled}
			onClick={onClick}
			className={clsx(
				"w-11 h-9 flex items-center justify-center rounded-full transition-colors",
				disabled
					? "bg-gray500/80 text-white cursor-not-allowed"
					: "bg-violet300 hover:bg-violet300/80 text-white"
			)}
		>
			<ArrowUpIcon size={16} />
		</button>
	);
};

export default SendButton;
