import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type FormType = "email" | "password";

interface FormState {
	email: string;
	password: string;
}

interface FormErrors {
	email?: string;
	password?: string;
}

const useLoginForm = () => {
	const [formState, setFormState] = useState<FormState>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const handleFormChange = useCallback(
		(key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setFormState((prev) => ({ ...prev, [key]: value }));
			setErrors((prev) => ({ ...prev, [key]: "" }));
		},
		[]
	);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);
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
		handleSubmit,
		handleGoogleLogin,
		handleKakaoLogin,
	};
};

export default useLoginForm;
