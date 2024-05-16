import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                emailAddress: {},
                password: {},
            },
            async authorize(credentials: any, req) {
                const {
                    email,
                    id,
                    accessToken,
                    refreshToken
                } = credentials!;

                console.log("credentials", credentials)

                if (refreshToken) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        email,
                        id,
                        accessToken,
                        refreshToken
                    };
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }

            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") return { ...token, ...session.user };

            return { ...token, ...user };
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token as any;

            return session;
        },
    },
};