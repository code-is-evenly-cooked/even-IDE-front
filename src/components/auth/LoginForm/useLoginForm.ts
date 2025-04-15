"use client";

import {ChangeEvent, FormEvent, useCallback, useState, useEffect} from "react";
import {signIn, useSession} from "next-auth/react";
import {useAuthStore} from "@/stores/useAuthStore";
import {useRouter} from "next/navigation"

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
    const {data: session} = useSession();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const [formState, setFormState] = useState<FormState>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleFormChange = useCallback(
        (key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
            const {value} = e.target;
            setFormState((prev) => ({...prev, [key]: value}));
            setErrors((prev) => ({...prev, [key]: ""}));
        },
        []
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await signIn("google", {redirect: false});

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
            const res = await signIn("kakao", { redirect: false });

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
                    alert("서버 인증 실패 또는 권한 없음");
                });
        }
    }, [session?.accessToken]);

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