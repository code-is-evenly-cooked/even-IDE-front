import IconButton from "@/components/common/Button/IconButton";
import { MinusCloseIcon } from "@/components/common/Icons";
import { usePanelStore } from "@/stores/usePanelState";
import React from "react";

const AITitle = () => {
	const { closePanel } = usePanelStore();
	return (
		<div className="p-4 text-md font-semibold text-white text-center flex justify-between items-center">
			<span>Even AI</span>
			<div className="ml-auto">
				<IconButton
					icon={<MinusCloseIcon />}
					size="sm"
					label="닫기"
					transparent
					onClick={closePanel}
				/>
			</div>
		</div>
	);
};

export default AITitle;
