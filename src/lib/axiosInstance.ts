import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

// 쿠키에서 access_token 읽기
// const getTokenFromCookies = () => {
//     if (typeof document !== "undefined") {
//         const cookies = document.cookie.split("; ");
//         const accessTokenCookie = cookies.find((cookie) =>
//             cookie.startsWith("access_token=")
//         );
//         return accessTokenCookie?.split("=")[1];
//     }
//     return null;
// };
//
// export const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     withCredentials: true, // 쿠키도 자동 전송
// });
//
// // 요청 직전 인터셉터에서 Authorization 헤더 추가
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = getTokenFromCookies();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );