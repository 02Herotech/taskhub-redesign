import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {

                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
                        emailAddress: email,
                        password,
                    });

                    const { data, status } = response;
                    console.log(response)

                    if (status === 200) {
                        return {
                            ...data,
                            // jwtToken: data.token,
                            jwtt: data.token,

                        };
                    } else {
                        // throw new Error(`Unexpected status error:, ${status}`);
                        console.log("Unexpected status error: ", status);
                        return null
                    }
                } catch (error) {
                    console.error("Request error: ", error);
                    return null
                }

            },
        })
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },

};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST }