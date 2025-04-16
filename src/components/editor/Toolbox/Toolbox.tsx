import React from "react";
import IconButton from "../../common/Button/IconButton";
import { MessageCircleCodeIcon } from "lucide-react";

const Toolbox = () => {
	return (
		<aside className="flex flex-col w-9 mx-2 bg-gray900">
			<IconButton
				icon={<MessageCircleCodeIcon width={16} height={16} />}
				label="채팅 실행"
				color="gray700"
				isActive={true}
				onClick={() => {}}
			/>
		</aside>
	);
};

export default Toolbox;
