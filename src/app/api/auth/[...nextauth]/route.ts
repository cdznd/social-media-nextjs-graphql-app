import NextAuth, { SessionStrategy, AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../../../../lib/prisma';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
