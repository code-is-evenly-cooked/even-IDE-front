import { AgreementsState, AgreementsType } from "@/types/agreement";
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

		if (!agreements.terms || !agreements.privacy) {
			alert("필수 약관에 동의해주세요");
		}

		setIsLoading(true);
		try {
			// API 요청
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
