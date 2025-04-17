import { PanelType } from "@/types/panel";
import React from "react";

interface RightPanelProps {
	activePanel: PanelType | null;
}

const RightPanel = ({ activePanel }: RightPanelProps) => {
	if (!activePanel) return null; // activePanel 없으면 랜더링 X

	return <div className="w-[300px] bg-gray500/30"></div>;
};

export default RightPanel;
