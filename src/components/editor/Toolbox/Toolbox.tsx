import React, { ReactNode } from "react";
import { MessageCircleCodeIcon } from "lucide-react";
import IconButton from "@/components/common/Button/IconButton";
import { PanelType } from "@/types/panel";

interface ToolboxProps {
	activePanel: PanelType | null;
	onSelect: (PanelType: PanelType | null) => void;
}

const Toolbox = ({ onSelect, activePanel }: ToolboxProps) => {
	const handleClick = (panel: PanelType) => {
		onSelect(activePanel === panel ? null : panel);
	};

	const TOOLBOX_ITEMS: { panel: PanelType; icon: ReactNode; label: string }[] =
		[
			{
				panel: "chat",
				icon: <MessageCircleCodeIcon width={16} height={16} />,
				label: "채팅",
			},
		];

	return (
		<aside className="flex flex-col w-9 mx-2 bg-gray900">
			{TOOLBOX_ITEMS.map(({ panel, icon, label }) => (
				<IconButton
					key={panel}
					icon={icon}
					label={activePanel === panel ? `${label} 닫기` : `${label} 열기`}
					color="gray700"
					isActive={activePanel === panel}
					onClick={() => handleClick(panel)}
				/>
			))}
		</aside>
	);
};

export default Toolbox;
