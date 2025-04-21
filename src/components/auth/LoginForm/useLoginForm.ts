"use client";

import {saveAuthCookie} from "@/lib/cookie";
import {userLogin} from "@/service/auth";
import {useAuthStore} from "@/stores/useAuthStore";
import {validateEmail, validatePassword} from "@/utils/validate";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";

type FormType = "email" | "password";

interface LoginFormErrors {
    email?: string;
    password?: string;
}

const useLoginForm = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = useCallback(() => {
        const newErrors: LoginFormErrors = {};

        const emailError = validateEmail(formState.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(formState.password);
        if (passwordError) newErrors.password = passwordError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formState.email, formState.password]);

    const handleFormChange = useCallback(
        (key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
            const {value} = e.target;
            setFormState((prev) => ({...prev, [key]: value}));
            setErrors((prev) => ({...prev, [key]: ""}));
        },
        []
    );

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await userLogin({
                email: formState.email,
                password: formState.password,
            });
            saveAuthCookie(response.accessToken);
            useAuthStore.getState().setAuth(response.accessToken, "local");
            router.replace("/editor");
        } catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = () => {
        router.push("/signup");
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await signIn("google", {
                redirect: true,
                callbackUrl: "/editor",
            });

            if (res?.error) {
                console.error("구글 로그인 실패", res.error);
                return;
            }
        } catch (error) {
            console.error("구글 로그인 중 에러", error);
        }
        console.log("google Login");
    };

    const handleKakaoLogin = async () => {
        try {
            const res = await signIn("kakao", {
                redirect: true,
                callbackUrl: "/editor",
            });

            if (res?.error) {
                console.error("카카오 로그인 실패", res.error);
                return;
            }
        } catch (error) {
            console.error("카카오 로그인 중 에러", error);
        }

        console.log("kakao Login");
    };

    useEffect(() => {
        const accessToken = session?.accessToken as string | undefined;
        const provider = session?.user?.provider ?? "google";

        console.log("🔍 session:", session);
        console.log("🔍 accessToken:", session?.accessToken);

        if (accessToken) {
            setAccessToken(accessToken);

            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    provider,
                    token: accessToken,
                }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const errorText = await res.text();
                        throw new Error(`서버 오류: ${res.status} ${errorText}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("서버 응답", data);
                    router.push("/editor");
                })
                .catch((err) => {
                    console.error("서버 통신 에러", err);
                });
        }
    }, [session?.accessToken]);

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
