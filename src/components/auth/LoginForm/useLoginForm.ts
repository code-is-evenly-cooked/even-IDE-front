import { useRouter } from "next/navigation";
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
	const router = useRouter();
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

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

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
