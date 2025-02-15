import { objectType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.id("id");
        t.string("name");
        t.string("email");
        t.nullable.field("emailVerified", { type: "DateTime" });
        t.nullable.string("password")
        t.nonNull.string("username")
        t.nullable.string("image");

        t.list.nonNull.field("accounts", { type: "Account" });
        t.list.nonNull.field("sessions", { type: "Session" });
        t.list.nonNull.field("authenticators", { type: "Authenticator" });
        t.list.nonNull.field("posts", { type: "Post" });
        t.list.nonNull.field("likes", { type: "Like" });
        t.list.nonNull.field("comments", { type: "Comment" });

        t.list.nonNull.field("friends", {
            type: User,
            resolve: async (parent, _args, context: Context) => {
                const friendships = await context.prisma.friendship.findMany({
                    where: {
                        OR: [
                            { userAId: parent.id as string },
                            { userBId: parent.id as string }
                        ],
                        // status: "ACCEPTED",  // Optional: Filter only accepted friendships
                    },
                    include: { userA: true, userB: true }
                });

                // Return the other user in the friendship
                return friendships.map(f => (f.userAId === parent.id ? f.userB : f.userA));
            }
        });

        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
    },
});

export const Account = objectType({
    name: "Account",
    definition(t) {
        t.string("userId");
        t.string("type");
        t.string("provider");
        t.string("providerAccountId");
        t.nullable.string("refresh_token");
        t.nullable.string("access_token");
        t.nullable.int("expires_at");
        t.nullable.string("token_type");
        t.nullable.string("scope");
        t.nullable.string("id_token");
        t.nullable.string("session_state");
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
        t.field("user", { type: "User" });
    },
});

export const Session = objectType({
    name: "Session",
    definition(t) {
        t.string("sessionToken");
        t.string("userId");
        t.nonNull.field("expires", { type: "DateTime" });
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
        t.field("user", { type: "User" });
    },
});

export const VerificationToken = objectType({
    name: "VerificationToken",
    definition(t) {
        t.string("identifier");
        t.string("token");
        t.nonNull.field("expires", { type: "DateTime" });
    },
});

export const Authenticator = objectType({
    name: "Authenticator",
    definition(t) {
        t.string("credentialID");
        t.string("userId");
        t.string("providerAccountId");
        t.string("credentialPublicKey");
        t.int("counter");
        t.string("credentialDeviceType");
        t.boolean("credentialBackedUp");
        t.nullable.string("transports");
        t.nonNull.field("createdAt", { type: "DateTime" });
        t.nonNull.field("updatedAt", { type: "DateTime" });
        t.field("user", { type: "User" });
    },
});