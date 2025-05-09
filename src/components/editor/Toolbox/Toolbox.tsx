import React, { ReactNode } from "react";
import { MessageCircleCodeIcon } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { AIIcon } from "@/components/common/Icons";
import { PanelType, usePanelStore } from "@/stores/usePanelState";

const Toolbox = () => {
	const { activePanel, togglePanel } = usePanelStore();

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
		{
			panel: "ai",
			icon: <AIIcon />,
			label: "AI",
		},
	];

	return (
		<aside className="flex flex-col w-9 mx-1 bg-gray900 shrink-0 gap-1">
			{TOOLBOX_ITEMS.map(({ panel, icon, label }) => (
				<IconButton
					key={panel}
					icon={icon}
					label={activePanel === panel ? `${label} 닫기` : `${label} 열기`}
					color="gray700"
					isActive={activePanel === panel}
					onClick={() => togglePanel(panel)}
				/>
			))}
		</aside>
	);
};

export default Toolbox;
