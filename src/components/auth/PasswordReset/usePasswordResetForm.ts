import { validatePassword } from "@/utils/validate";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type FormType = "password" | "passwordConfirm";

interface PasswordResetErrors {
	password?: string;
	passwordConfirm?: string;
}

const usePasswordResetForm = () => {
	const [formState, setFormState] = useState({
		password: "",
		passwordConfirm: "",
	});
	const [errors, setErrors] = useState<PasswordResetErrors>({});

	const validateForm = useCallback(() => {
		const newErrors: PasswordResetErrors = {};

		const passwordError = validatePassword(formState.password);
		if (passwordError) newErrors.password = passwordError;

		if (formState.password !== formState.passwordConfirm) {
			newErrors.passwordConfirm = "비밀번호가 다릅니다.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formState.password, formState.passwordConfirm]);

	const handleFormChange = useCallback(
		(key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setFormState((prev) => ({ ...prev, [key]: value }));
			setErrors((prev) => ({ ...prev, [key]: "" }));
		},
		[]
	);

	const handleResetPassword = (e: FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		console.log(formState);
	};

	return {
		formState,
		errors,
		handleFormChange,
		handleResetPassword,
	};
};

export default usePasswordResetForm;
