import { AgreementsState, AgreementsType } from "@/types/agreement";
import {
	validateEmail,
	validateNickname,
	validatePassword,
} from "@/utils/validate";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type SignupFormType = "email" | "password" | "confirmPassword" | "nickname";

interface SignupFormErrors {
	email?: string;
	password?: string;
	confirmPassword?: string;
	nickname?: string;
}

const useSignupForm = () => {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		nickname: "",
	});
	const [agreements, setAgreements] = useState<AgreementsState>({
		all: false,
		terms: false,
		privacy: false,
	});
	const [errors, setErrors] = useState<SignupFormErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = useCallback(() => {
		const newErrors: SignupFormErrors = {};

		const emailError = validateEmail(formState.email);
		if (emailError) newErrors.email = emailError;

		const passwordError = validatePassword(formState.password);
		if (passwordError) newErrors.password = passwordError;

		if (formState.password !== formState.confirmPassword) {
			newErrors.confirmPassword = "비밀번호가 다릅니다.";
		}

		const nicknameError = validateNickname(formState.nickname);
		if (nicknameError) newErrors.nickname = nicknameError;
		console.log(newErrors);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [
		formState.email,
		formState.password,
		formState.confirmPassword,
		formState.nickname,
	]);

	const handleFormChange = useCallback(
		(key: SignupFormType) => (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setFormState((prev) => ({ ...prev, [key]: value }));
			if (errors[key]) {
				setErrors((prev) => ({ ...prev, [key]: "" }));
			}
		},
		[errors]
	);

	const handleAgreementToggle = useCallback((key: AgreementsType) => {
		setAgreements((prev) => {
			if (key === "all") {
				const newValue = !prev.all;
				return {
					all: newValue,
					terms: newValue,
					privacy: newValue,
				};
			}

			const updated = { ...prev, [key]: !prev[key] };
			updated.all = updated.terms && updated.privacy;
			return updated;
		});
	}, []);

	const handleSignup = async (e: FormEvent) => {
		e.preventDefault();
		console.log(validateForm());

		if (!validateForm()) return;

		if (!agreements.terms || !agreements.privacy) {
			alert("필수 약관에 동의해주세요");
		}

		setIsLoading(true);
		try {
			// TODO: API 요청
			console.log("회원가입 정보", formState);
			console.log("약관 동의 상태", agreements);
		} catch (error) {
			console.error("회원가입 실패", error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formState,
		agreements,
		errors,
		isLoading,
		handleFormChange,
		handleAgreementToggle,
		handleSignup,
	};
};

export default useSignupForm;
