import NextAuth, { SessionStrategy, getServerSession, Session } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if(!credentials) {
                    return null
                }

                const credentialsEmail = credentials.username
                const credentialsPassword = credentials.password

                console.log('credentialsEmail', credentialsEmail);
                console.log('credentialsPassword', credentialsPassword);

                try {
                    const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                    if(user) {
                        return user
                    } else {
                        throw new Error("User not found.")
                    }
                } catch(error) {
                    console.error(error)
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                const emailFirstPart = profile.email.split('@')
                const newUsername = `${emailFirstPart[0]}-${Math.floor(Math.random() * 999)}`
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile?.family_name ?? ''}`,
                    email: profile.email,
                    image: profile.picture,
                    username: newUsername
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                }
            };
        },
    }
}

export const handler = NextAuth(authOptions);

// 
export function auth(): Promise<Session | null> {
    return getServerSession(authOptions)
}