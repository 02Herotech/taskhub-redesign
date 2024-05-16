import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
                const res = await axios.post(baseUrl + "/auth/login", credentials);
                const user = res.data;

                // If no error and we have user data, return it
                if (res.status === 200 && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
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