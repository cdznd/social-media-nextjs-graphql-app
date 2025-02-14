import NextAuth, { SessionStrategy, getServerSession, Session } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../prisma/context"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password.");
                }
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        password: true
                    } // Returning only the necessary fields with select
                });
                if (!user || !user.password) {
                    throw new Error("Invalid credentials.");
                }
                const isValidPassword = await compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid credentials.");
                }
                return user // The data returned here will be included on the session object.
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

export function auth(): Promise<Session | null> {
    return getServerSession(authOptions)
}