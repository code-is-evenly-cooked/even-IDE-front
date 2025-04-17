import GoogleProvider from "next-auth/providers/google";
import type {AuthOptions} from "next-auth";
import type {JWT} from "next-auth/jwt";
import type {Session} from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, account}) {
            console.log("🐛 JWT 콜백 실행됨");
            console.log("🐛 account 전체 내용:", account);
            if (account) {
                console.log("🔑 access_token:", account.access_token);
                console.log("🔐 id_token:", account?.id_token);
                token.accessToken = account.access_token;
            } else {
                console.log("❗ account가 undefined임");
            }
            return token;
        },
        async session({
                          session,
                          token,
                      }: {
            session: Session & { accessToken?: string };
            token: JWT & { accessToken?: string };
        }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
};