import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import environment from "@/config/environment";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/service/auth.service";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24, // 24 jam
	},
	secret: environment.AUTH_SECRET,
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				identifier: { label: "identifier", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: Record<"identifier" | "password", string> | undefined): Promise<UserExtended | null> {
				const { identifier, password } = credentials as { identifier: string; password: string };
				const result = await authServices.login({ identifier, password });

				const accessToken = result.data.data;
				const me = await authServices.getProfileWithToken(accessToken);
				const user = me.data.data;

				if (accessToken && result.status === 200 && me.status === 200) {
					user.accessToken = accessToken;
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
			if (token) {
				session.user = token.user;
				session.accessToken = token.user?.accessToken;
			}
			return session;
		},
	},
};
