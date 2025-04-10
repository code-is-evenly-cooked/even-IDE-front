import { validateEmail, validatePassword } from "@/utils/validate";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type FormType = "email" | "password";

interface LoginFormErrors {
	email?: string;
	password?: string;
}

const useLoginForm = () => {
	const router = useRouter();
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<LoginFormErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = useCallback(() => {
		const newErrors: LoginFormErrors = {};

		const idError = validateEmail(formState.email);
		if (idError) newErrors.email = idError;

		const passwordError = validatePassword(formState.password);
		if (passwordError) newErrors.password = passwordError;

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formState.email, formState.password]);

	const handleFormChange = useCallback(
		(key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setFormState((prev) => ({ ...prev, [key]: value }));
			setErrors((prev) => ({ ...prev, [key]: "" }));
		},
		[]
	);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);
	};

	const handleSignup = () => {
		router.push("/signup");
	};

	const handleGoogleLogin = () => {
		console.log("google Login");
	};

	const handleKakaoLogin = () => {
		console.log("kakao Login");
	};

	return {
		formState,
		errors,
		isLoading,
		handleFormChange,
		handleLogin,
		handleSignup,
		handleGoogleLogin,
		handleKakaoLogin,
	};
};

export default useLoginForm;
