import NextAuth, { SessionStrategy, getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile?.family_name ?? ''}`,
                    email: profile.email,
                    image: profile.picture
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

// Use it in server contexts
export function auth(
    // ...args:
    //     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    //     | [NextApiRequest, NextApiResponse]
    //     | []
) {
    return getServerSession(authOptions)
}