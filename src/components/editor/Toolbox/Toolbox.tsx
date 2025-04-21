import React, { ReactNode } from "react";
import { MessageCircleCodeIcon } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { useChatStore } from "@/stores/useChatStore";

type PanelType = "chat";

const Toolbox = () => {
	const { isVisible, toggleVisibility } = useChatStore();

	const TOOLBOX_ITEMS: {
		panel: PanelType;
		icon: ReactNode;
		label: string;
	}[] = [
		{
			panel: "chat",
			icon: <MessageCircleCodeIcon width={16} height={16} />,
			label: "채팅",
		},
	];

	return (
		<aside className="flex flex-col w-9 mx-1 bg-gray900 shrink-0">
			{TOOLBOX_ITEMS.map(({ panel, icon, label }) => (
				<IconButton
					key={panel}
					icon={icon}
					label={isVisible ? `${label} 닫기` : `${label} 열기`}
					color="gray700"
					isActive={isVisible}
					onClick={toggleVisibility}
				/>
			))}
		</aside>
	);
};

export default Toolbox;
