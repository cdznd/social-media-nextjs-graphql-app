
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import server from "@/lib/graphql/server";

import { createContext, Context } from "@/lib/prisma/context";

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: createContext,
});

export { handler as GET, handler as POST };