import { GhostIcon } from "../common/Icons";

type EditLockToggleProps = {
	mode: 'active-hover' | 'active' | 'locked';
};

export default function EditLockToggle({ mode } : EditLockToggleProps) {
	const isEditLocked = mode === 'locked';

	const bgColor =
		mode === 'active-hover'
			? 'bg-[#A78BFA]'
			: mode === 'active'
			? 'bg-[#262626]'
			: 'bg-[#3E3655]';
	
	const circleColor =
		mode === 'active-hover'
			? 'bg-[#FFFFFF]'
			: mode === 'active'
			? 'bg-[#1E1E1E]'
			: 'bg-[#262626]';

	const ghostColor =
		mode === 'active-hover'
			? 'text-white'
			: mode === 'active'
			? 'text-[#1E1E1E]'
			: 'text-[#3E3655]';

	return (
		<div className="flex items-center gap-2">
			<GhostIcon className={`w-6 h-6 ${ghostColor}`} />

			<button
        disabled={isEditLocked}
        className={`w-[60px] h-[30px] rounded-full p-1 flex items-center transition-colors duration-300 ${bgColor}`}
      >
        <div
          className={`w-[24px] h-[24px] rounded-full transition-transform duration-300 ${circleColor} ${
            isEditLocked ? 'translate-x-0' : 'translate-x-[28px]'
          }`}
        />
      </button>
		</div>

	)
};
