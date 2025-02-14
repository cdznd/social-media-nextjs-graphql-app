import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getToken } from "next-auth/jwt";
import server from "@/lib/graphql/server";
import { createContext, Context } from "@/lib/prisma/context";

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    const token = await getToken({ req });
    if (process.env.NODE_ENV === 'production' && !token) {
      throw new Error('Authentication required');
    }
    return createContext();
  },
});

export { handler as GET, handler as POST };