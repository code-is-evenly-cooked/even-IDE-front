import { useAuthStore } from "@/stores/useAuthStore";
import { useLoginModalStore } from "@/stores/useLoginModalStore";

/**
 * 로그인 상태를 확인하고, 미로그인 상태일 경우 로그인 유도 모달을 띄움
 * return 값이 true일 때만 실행
 */
const useRequireLogin = () => {
	const { isLoggedIn } = useAuthStore();
	const { open } = useLoginModalStore();

	const checkLogin = (): boolean => {
		if (!isLoggedIn) {
			open();
			return false;
		}
		return true;
	};

	return { checkLogin };
};

export default useRequireLogin;
