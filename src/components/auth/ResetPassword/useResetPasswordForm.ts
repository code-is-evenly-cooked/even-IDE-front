import { validateEmail } from "@/utils/validate";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const useResetPasswordForm = () => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = useCallback(() => {
		const error = validateEmail(email);
		if (error) {
			setEmailError(error);
			return false;
		}
		setEmailError("");
		return true;
	}, [email]);

	const handleEmailChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
			if (emailError) setEmailError("");
		},
		[emailError]
	);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			// TODO: API 요청
			console.log("이메일 제출:", email);
		} catch (err) {
			console.error("이메일 제출 실패", err);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		email,
		emailError,
		isLoading,
		handleEmailChange,
		handleSubmit,
	};
};

export default useResetPasswordForm;
