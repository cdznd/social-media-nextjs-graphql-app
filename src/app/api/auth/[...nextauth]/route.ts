import NextAuth,
{
    SessionStrategy,
    User,
    Account,
    Profile
} from "next-auth"

// Providers
import GoogleProvider from "next-auth/providers/google"

// Adpters
import { AdapterUser } from "next-auth/adapters"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

// Prisma Own implementation
import { prisma } from "../../../../../lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: { user: User | AdapterUser, account: Account | null, profile?: Profile, email?: { verificationRequest?: boolean }, credentials?: Record<string, any> }) {

            console.log('Inside SignIn')

            if (!profile?.email) {
                throw new Error('No profile')
            }

            console.log('Right before upsert')

            await prisma.user.upsert({
                where: {
                    email: profile.email
                },
                create: {
                    email: profile.email,
                    name: profile.name
                },
                update: {
                    name: profile.name
                }
            })
            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET ?? '',
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    theme: {
        colorScheme: "auto" as const,
    },
    debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }